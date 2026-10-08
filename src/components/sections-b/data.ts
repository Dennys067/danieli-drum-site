// Conteúdo das seções Como Funciona o Atendimento, CTA final e Rodapé.
// Dados de contato ainda não fornecidos pela cliente ficam como `null` (PENDENTE):
// a interface mostra "Pendente" no lugar e nenhum dado é inventado.

export const PENDING_LABEL = "Pendente";

export const contact: {
  whatsappNumber: string | null; // somente dígitos, com DDI 55 + DDD
  whatsappDisplay: string | null;
  email: string | null;
  instagramHandle: string | null; // ex.: "@usuario"
  oab: string | null; // ex.: "OAB/UF 000.000"
  addressLines: string[] | null;
  mapQuery: string | null; // endereço usado na busca do mapa
} = {
  whatsappNumber: "556799549879",
  whatsappDisplay: "(67) 9954-9879",
  email: "danieli.drum@outlook.com",
  instagramHandle: "@danieli.drum",
  oab: "OAB/MS 24680",
  addressLines: ["Rua Dr. França Simões, 1541 · Centro", "Glória de Dourados/MS · CEP 79730-007"],
  mapQuery: "Rua Dr. França Simões, 1541 - Centro, Glória de Dourados - MS, 79730-007",
};

const whatsappMessage = "Olá, Dra. Danieli. Gostaria de agendar um atendimento.";

// Enquanto o número estiver pendente, o botão leva ao rodapé em vez de abrir o WhatsApp.
export const whatsappUrl = contact.whatsappNumber
  ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  : "#rodape";

export const instagramUrl = contact.instagramHandle
  ? `https://instagram.com/${contact.instagramHandle.replace(/^@/, "")}`
  : null;

export const mapEmbedUrl = contact.mapQuery
  ? `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=16&output=embed`
  : null;

// Logo para fundos escuros, servido pela pasta public/ do projeto.
export const darkLogo = {
  src: "/brand/logo-vertical-escuro-transparente.png",
  width: 3200,
  height: 2560,
  alt: "Danieli Drum – Advocacia e Consultoria Jurídica",
};

export type ProcessStep = {
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Primeiro contato",
    description:
      "Um momento para ouvir com atenção a sua história e compreender o que motivou a sua procura.",
  },
  {
    title: "Análise do caso",
    description:
      "Estudo cuidadoso dos documentos, do histórico e da legislação aplicável à sua situação.",
  },
  {
    title: "Estratégia jurídica",
    description:
      "Apresentação do caminho jurídico indicado, com explicação clara das etapas, prazos e possibilidades.",
  },
  {
    title: "Acompanhamento",
    description:
      "Atualizações sobre cada andamento, para que você saiba em que ponto está o seu caso.",
  },
  {
    title: "Resultado",
    description:
      "Ao final, a explicação do desfecho e a orientação sobre os próximos passos, quando houver.",
  },
];
