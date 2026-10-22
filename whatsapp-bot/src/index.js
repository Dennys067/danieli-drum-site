// Robô de WhatsApp (API oficial da Meta / WhatsApp Cloud API).
// Responde automaticamente SOMENTE a quem envia a mensagem gerada pelo formulário do site,
// que sempre contém a frase-chave abaixo. As demais conversas não recebem resposta automática.
//
// Segredos (Cloudflare > Worker > Configurações > Variáveis e segredos):
//   WHATSAPP_TOKEN   token de acesso da Meta
//   PHONE_NUMBER_ID  identificação do número de telefone (painel da Meta)
//   VERIFY_TOKEN     senha escolhida por você para validar o webhook
//   APP_SECRET       chave secreta do app da Meta (opcional, recomendado)

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
