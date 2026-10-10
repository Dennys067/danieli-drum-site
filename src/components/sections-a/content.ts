/**
 * Conteúdo das seções Sobre, Áreas de Atuação e Princípios.
 *
 * Itens com `pending: true` aparecem marcados como pendentes no site.
 * Os textos seguem as regras de publicidade da OAB: tom informativo,
 * sem promessa de resultado, sem preços e sem comparações.
 */

export type Pendable = { text: string; pending?: boolean };

export const about = {
  eyebrow: "Sobre",
  title: "Danieli Drum",
  subtitle: "Advocacia e Consultoria Jurídica",
  presentation: [
    "Como advogada, acredito que buscar orientação jurídica deve ser uma experiência acolhedora, clara e segura. Por isso, procuro estar próxima de cada cliente, ouvindo sua história com atenção e compreendendo, de forma cuidadosa, as necessidades e particularidades de cada caso.",
    "Sei que, muitas vezes, lidar com uma questão jurídica pode gerar dúvidas, insegurança e preocupação. Por isso, faço questão de explicar cada etapa de maneira simples e objetiva, apresentando os caminhos possíveis e ajudando você a tomar decisões conscientes.",
    "Mais do que aplicar a lei, acredito que a advocacia também envolve escuta, respeito e cuidado com as pessoas. Estou aqui para oferecer orientação jurídica com proximidade, clareza e compromisso, buscando a melhor solução para cada situação.",
  ],
  oab: { pending: false, text: "OAB/MS 24680" } satisfies Pendable,
  pillars: [
    {
      title: "Formação",
      text: "Direito pelo Centro Universitário da Grande Dourados (UNIGRAN), janeiro de 2019.",
    },
    {
      title: "Missão",
      text: "Orientar cada pessoa com clareza sobre seus direitos e conduzir cada caso com técnica, ética e dedicação.",
    },
    {
      title: "Valores",
      text: "Ética, sigilo, transparência e respeito à história de quem confia o seu caso ao escritório.",
    },
  ] as { title: string; text: string; pending?: boolean }[],
  humanized: {
    title: "Atendimento humanizado",
    text: "Cada pedido de benefício ou questão contratual envolve uma pessoa, uma família e um projeto de vida. O atendimento é próximo, em linguagem clara, com acompanhamento em todas as etapas.",
  },
};

export type PracticeArea = {
  id: "previdenciario" | "civel";
  title: string;
  description: string;
  items: { label: string; detail: string }[];
};

export const practiceAreas = {
  eyebrow: "Áreas de atuação",
  title: "Previdenciário e Cível",
  lead: "Atuação consultiva e contenciosa em duas áreas, com atenção individual a cada caso.",
  areas: [
    {
      id: "previdenciario",
      title: "Direito Previdenciário",
      description:
        "Orientação e atuação junto ao INSS e ao Poder Judiciário em pedidos, revisões e planejamento de benefícios.",
      items: [
        { label: "Aposentadoria", detail: "Por idade, por tempo de contribuição, especial e da pessoa com deficiência." },
        { label: "Benefícios do INSS", detail: "Auxílio por incapacidade, auxílio-acidente, pensão por morte e salário-maternidade." },
        { label: "BPC/LOAS", detail: "Benefício assistencial à pessoa idosa e à pessoa com deficiência." },
        { label: "Revisões", detail: "Análise de benefícios já concedidos e verificação de possíveis revisões." },
        { label: "Planejamento Previdenciário", detail: "Estudo das regras aplicáveis e do momento adequado para a aposentadoria." },
      ],
    },
    {
      id: "civel",
      title: "Direito Cível",
      description:
        "Consultoria e atuação em relações civis e contratuais, com foco na prevenção e na condução cuidadosa de conflitos.",
      items: [
        { label: "Indenizações", detail: "Pedidos de reparação por danos morais e materiais." },
        { label: "Contratos", detail: "Elaboração, revisão e análise de contratos." },
        { label: "Cobranças", detail: "Recuperação de créditos pelas vias extrajudicial e judicial." },
        { label: "Responsabilidade Civil", detail: "Análise de responsabilidade e reparação de danos." },
        { label: "Demandas Judiciais", detail: "Acompanhamento de ações cíveis em todas as fases do processo." },
      ],
    },
  ] satisfies PracticeArea[],
};

export type DifferentialIcon = "person" | "eye" | "compass" | "clock" | "seal";

export const differentials = {
  eyebrow: "Princípios",
  title: "Princípios do atendimento",
  lead: "A forma de conduzir cada caso se apoia em cinco compromissos.",
  items: [
    {
      icon: "person",
      title: "Atendimento personalizado",
      text: "Cada caso é analisado individualmente, a partir da sua história e dos seus documentos.",
    },
    {
      icon: "eye",
      title: "Transparência",
      text: "Informação clara sobre cada etapa, os caminhos possíveis e os riscos envolvidos.",
    },
    {
      icon: "compass",
      title: "Estratégia jurídica",
      text: "Decisões fundamentadas na legislação, na jurisprudência e nas particularidades de cada situação.",
    },
    {
      icon: "clock",
      title: "Agilidade",
      text: "Comunicação ágil e acompanhamento atento dos prazos e movimentações do processo.",
    },
    {
      icon: "seal",
      title: "Compromisso",
      text: "Dedicação, ética e responsabilidade na condução de cada caso, do primeiro contato ao encerramento.",
    },
  ] satisfies { icon: DifferentialIcon; title: string; text: string }[],
};
