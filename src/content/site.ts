/**
 * Dados compartilhados pela estrutura do site (cabeçalho, botão flutuante, metadados).
 * As seções têm seus próprios arquivos de conteúdo em src/components/sections-a e sections-b.
 * Campos [PENDENTE] aguardam os dados reais da Dra. Danieli Drum.
 */
export const site = {
  name: "Danieli Drum",
  tagline: "Advocacia e Consultoria Jurídica",
  areas: "Direito Previdenciário e Direito Cível",
  whatsapp: "556799549879",
  // [PENDENTE] domínio definitivo
  url: "https://www.danielidrum.adv.br",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  schedule: "Olá, Dra. Danieli. Gostaria de agendar um atendimento.",
};

export const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#areas", label: "Atuação" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#como-funciona", label: "Atendimento" },
  { href: "#contato", label: "Contato" },
];
