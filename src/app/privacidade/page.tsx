import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { contact } from "@/components/sections-b/data";
import { Footer } from "@/components/sections-b";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${site.name}`,
  description: `Como o escritório ${site.name} trata os dados pessoais recebidos pelo site, pelo WhatsApp e por e-mail.`,
};

// Exigida pela Meta para publicar o app do robô de WhatsApp e pela LGPD (Lei 13.709/2018).
const sections: { title: string; paragraphs: string[] }[] = [
  {
    title: "Quem trata os dados",
    paragraphs: [
      `${site.name}, advogada inscrita na ${contact.oab}, com escritório na ${contact.addressLines?.join(", ")}. Contato: ${contact.email}.`,
    ],
  },
  {
    title: "Quais dados recebemos",
    paragraphs: [
      "O site não guarda dados em servidor próprio. O formulário de contato apenas monta uma mensagem com o nome, o assunto e o resumo que você escrever e abre o WhatsApp para que você mesmo a envie.",
      "Pelo WhatsApp ou por e-mail recebemos o seu nome, o seu número de telefone e as informações que você decidir compartilhar sobre a sua situação.",
    ],
  },
  {
    title: "Para que usamos",
    paragraphs: [
      "Os dados são usados somente para responder ao seu contato, enviar as informações sobre a consulta, agendar o atendimento e prestar o serviço jurídico contratado.",
      "Algumas mensagens do WhatsApp podem receber uma resposta automática com as informações sobre a consulta. A conversa continua com a advogada.",
    ],
  },
  {
    title: "Compartilhamento",
    paragraphs: [
      "Os dados não são vendidos nem cedidos a terceiros. As mensagens trafegam pelo WhatsApp, serviço da Meta, sujeito à política de privacidade dela. O mapa do rodapé é carregado do Google Maps, que pode usar cookies próprios.",
    ],
  },
  {
    title: "Guarda e sigilo",
    paragraphs: [
      "As informações são mantidas pelo tempo necessário ao atendimento e ao cumprimento de obrigações legais, sob o sigilo profissional previsto no Estatuto da Advocacia.",
    ],
  },
  {
    title: "Seus direitos",
    paragraphs: [
      `Você pode pedir a confirmação, o acesso, a correção ou a exclusão dos seus dados, conforme o art. 18 da LGPD, pelo e-mail ${contact.email}.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-20 font-sans md:py-28">
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.3em] text-bronze transition-colors duration-300 hover:text-coffee"
        >
          ← Voltar ao site
        </Link>

        <h1 className="mt-10 font-serif text-3xl font-light uppercase tracking-[0.14em] text-coffee md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-bronze">Atualizada em 22 de outubro de 2026</p>
        <div aria-hidden className="mt-8 h-px w-16 bg-gold" />

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-xl uppercase tracking-[0.12em] text-coffee">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-[15px] font-light leading-relaxed text-coffee/85">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
