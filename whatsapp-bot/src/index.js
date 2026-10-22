// Robô de WhatsApp (API oficial da Meta / WhatsApp Cloud API).
// Responde automaticamente SOMENTE a quem envia a mensagem gerada pelo formulário do site,
// que sempre contém a frase-chave abaixo. As demais conversas não recebem resposta automática.
//
// Segredos (Cloudflare > Worker > Configurações > Variáveis e segredos):
//   WHATSAPP_TOKEN   token de acesso da Meta
//   PHONE_NUMBER_ID  identificação do número de telefone (painel da Meta)
//   VERIFY_TOKEN     senha escolhida por você para validar o webhook
//   APP_SECRET       chave secreta do app da Meta (opcional, recomendado)
//
// Pela Telnyx (parceira da Meta, permite manter o número no app WhatsApp Business):
//   TELNYX_API_KEY     chave de API da Telnyx
//   TELNYX_PUBLIC_KEY  chave pública da Telnyx para conferir os webhooks (opcional, recomendado)

const KEYWORD = "informacoes sobre a consulta";

const REPLY = [
  "Olá! Obrigada pelo contato com o escritório Danieli Drum.",
  "",
  "A consulta de orientação jurídica tem o valor de R$ 250,00 e é realizada com hora marcada.",
  "",
  "Se desejar agendar, responda com o melhor dia e horário para você. Em breve confirmo o atendimento.",
].join("\n");

const normalize = (text) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

async function validSignature(request, body, secret) {
  if (!secret) return true;
  const header = request.headers.get("x-hub-signature-256") || "";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return header === `sha256=${hex}`;
}

async function postMessage(env, to, body) {
  const version = env.GRAPH_VERSION || "v23.0";
  const res = await fetch(`https://graph.facebook.com/${version}/${env.PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body } }),
  });
  const result = await res.text();
  // Registra o resultado de todo envio (sem dados sensíveis) para facilitar o diagnóstico.
  console.log(res.ok ? "Resposta enviada" : "Erro ao enviar", res.status, result);
  return result;
}

// Celulares do Brasil chegam da Meta sem o 9 extra (55 + DDD + 8 dígitos). Se a Meta recusar
// o número nesse formato, tenta de novo com o 9 depois do DDD.
const withNinthDigit = (to) => (/^55\d{2}[6-9]\d{7}$/.test(to) ? `${to.slice(0, 4)}9${to.slice(4)}` : null);

async function sendText(env, to, body) {
  const result = await postMessage(env, to, body);
  const retry = withNinthDigit(to);
  if (retry && result.includes("131030")) await postMessage(env, retry, body);
}

// Webhooks da Telnyx são assinados com Ed25519 sobre "timestamp|corpo".
async function validTelnyxSignature(request, body, publicKey) {
  if (!publicKey) return true;
  const signature = request.headers.get("telnyx-signature-ed25519");
  const timestamp = request.headers.get("telnyx-timestamp");
  if (!signature || !timestamp) return false;
  // Recusa avisos com mais de 5 minutos, para evitar reenvio de mensagens antigas.
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const bytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  try {
    const key = await crypto.subtle.importKey("raw", bytes(publicKey), { name: "Ed25519" }, false, ["verify"]);
    return await crypto.subtle.verify("Ed25519", key, bytes(signature), new TextEncoder().encode(`${timestamp}|${body}`));
  } catch {
    return false;
  }
}

async function sendTelnyxText(env, from, to, body) {
  const res = await fetch("https://api.telnyx.com/v2/messages/whatsapp", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.TELNYX_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, whatsapp_message: { type: "text", text: { body } } }),
  });
  console.log(res.ok ? "Resposta enviada (Telnyx)" : "Erro ao enviar (Telnyx)", res.status, await res.text());
}

async function handleTelnyx(request, env, ctx, body, event) {
  if (!(await validTelnyxSignature(request, body, env.TELNYX_PUBLIC_KEY))) {
    return new Response("Assinatura inválida", { status: 401 });
  }
  const payload = event.payload || {};
  console.log("Aviso da Telnyx", event.event_type, JSON.stringify(payload.errors || []));
  // Só mensagens recebidas de clientes; ignora as que a própria Dra. envia pelo app (message.echo).
  if (event.event_type !== "message.received" || payload.direction !== "inbound") return new Response("ok");
  const text = payload.body?.type === "text" ? payload.body.text?.body || "" : "";
  console.log("Mensagem recebida", payload.body?.type, normalize(text).includes(KEYWORD) ? "com a frase-chave" : "sem a frase-chave");
  if (normalize(text).includes(KEYWORD)) {
    const business = typeof payload.to === "string" ? payload.to : payload.to?.[0]?.phone_number;
    const customer = payload.from?.phone_number || payload.body?.from_user_id;
    ctx.waitUntil(sendTelnyxText(env, business, customer, REPLY));
  }
  return new Response("ok");
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Verificação do webhook pela Meta.
    if (request.method === "GET") {
      const ok =
        url.searchParams.get("hub.mode") === "subscribe" &&
        url.searchParams.get("hub.verify_token") === env.VERIFY_TOKEN;
      return ok
        ? new Response(url.searchParams.get("hub.challenge"))
        : new Response("Robô do WhatsApp Danieli Drum ativo.");
    }

    if (request.method !== "POST") return new Response("Método não permitido", { status: 405 });

    const body = await request.text();
    let telnyxEvent;
    try {
      telnyxEvent = JSON.parse(body).data;
    } catch {}
    if (telnyxEvent?.event_type) return handleTelnyx(request, env, ctx, body, telnyxEvent);

    if (!(await validSignature(request, body, env.APP_SECRET))) {
      return new Response("Assinatura inválida", { status: 401 });
    }

    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      return new Response("ok");
    }

    const tasks = [];
    for (const entry of payload.entry || []) {
      for (const change of entry.changes || []) {
        // Avisos de entrega da Meta (enviada, entregue, lida ou falhou, com o motivo da falha).
        for (const status of change.value?.statuses || []) {
          console.log("Status da entrega", status.status, JSON.stringify(status.errors || []));
        }
        for (const message of change.value?.messages || []) {
          const text = message.type === "text" ? message.text?.body || "" : "";
          console.log("Mensagem recebida", message.type, normalize(text).includes(KEYWORD) ? "com a frase-chave" : "sem a frase-chave");
          if (normalize(text).includes(KEYWORD)) tasks.push(sendText(env, message.from, REPLY));
        }
      }
    }
    // Responde 200 na hora para a Meta e envia a mensagem em segundo plano.
    if (tasks.length) ctx.waitUntil(Promise.all(tasks));
    return new Response("ok");
  },
};
