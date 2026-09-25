/*
  ============================================================
  COVEN — DADOS DA PÁGINA INVENTÁRIO
  ============================================================

  Toda a página pode ser editada por você neste arquivo.

  COMO ADICIONAR ITENS
  - Copie um objeto dentro de "items".
  - Troque o id por um valor único.
  - Defina a categoria.
  - Aponte a imagem em image.
  - Ajuste custo em XP, descrição e atributos.

  CATEGORIAS
  Você pode alterar os botões do topo em page.filters.

  ATRIBUTOS
  O campo attributes aceita qualquer lista editável, por exemplo:
  attributes: [
    { label: "ATAQUE", value: "+3" },
    { label: "DEFESA", value: "+1" },
    { label: "DURAÇÃO", value: "2 cenas" }
  ]

  TUDO É OPCIONAL
  - Você pode apagar "player" inteiro e o cabeçalho desaparece.
  - Dentro de player, pode apagar name, level, xpProgress ou stats.
  - Se attributes, tags, description, use, rarity, stock, status,
    xpCost ou image forem removidos de um item, a área correspondente
    some automaticamente sem deixar buracos no layout.
  - As imagens SVG deste pacote são apenas placeholders. Você pode usar
    JPG, PNG ou WebP reais apontando o caminho no campo image.

  LABELS DA INTERFACE
  Em page você também pode mudar/remover:
    previewLabel, openLabel, modalTitle e modalHeader.
*/

window.COVEN_INVENTARIO = {
  page: {
    eyebrow: "ROBICHAUX STORE // EXCHANGE",
    title: "INVENTÁRIO",
    previewLabel: "ACTIVE ITEM",
    openLabel: "ABRIR FICHA ↗",
    modalTitle: "ITEM DOSSIER",
    modalHeader: {
      line1: "ROBICHAUX SUPPLY ARCHIVE",
      line2: "INVENTORY EXCHANGE RECORD",
      line3: "NEW ORLEANS // COVEN MARKET"
    },
    filters: [
      { id: "todos", label: "TODOS" },
      { id: "habilidades", label: "HABILIDADES" },
      { id: "itens-magicos", label: "ITENS MÁGICOS" },
      { id: "armas", label: "ARMAS" }
    ]
  },

  // Este bloco inteiro pode ser apagado se você não quiser cabeçalho de jogador.
  player: {
    name: "ROBICHAUX MARKET",
    levelLabel: "LEVEL",
    level: "25",
    xpProgress: "256 / 750 XP",
    stats: [
      { label: "XP TOTAL", value: "1257" },
      { label: "ITENS ATIVOS", value: "3" },
      { label: "RANK", value: "57 / 2505" }
    ]
  },

  items: [
    {
      id: "grimorio-das-sombras",
      code: "MAG-01",
      name: "GRIMÓRIO DAS SOMBRAS",
      category: "ITENS MÁGICOS",
      categories: ["itens-magicos"],
      rarity: "RARO",
      status: "DISPONÍVEL",
      stock: "2 / 4",
      xpCost: "180 XP",
      image: "./assets/inventario/grimorio.svg",
      summary: "Livro ritualístico com encantos de contenção, leitura oculta e amplificação arcana.",
      description: "Um grimório antigo usado para fortalecer rituais, reconhecer símbolos e acessar feitiços previamente registrados pelo Coven.",
      use: "Pode conceder bônus em rituais, investigações mágicas e testes de conhecimento oculto.",
      attributes: [
        { label: "ATAQUE", value: "+0" },
        { label: "DEFESA", value: "+1" },
        { label: "SUPORTE", value: "+3" },
        { label: "DURAÇÃO", value: "3 cenas" }
      ],
      tags: ["Ritual", "Suporte", "Arcano"]
    },
    {
      id: "pocao-restauradora",
      code: "MAG-02",
      name: "POÇÃO RESTAURADORA",
      category: "ITENS MÁGICOS",
      categories: ["itens-magicos"],
      rarity: "INCOMUM",
      status: "DISPONÍVEL",
      stock: "5 / 8",
      xpCost: "90 XP",
      image: "./assets/inventario/pocao.svg",
      summary: "Mistura alquímica de uso rápido para estabilização e recuperação emergencial.",
      description: "Uma poção preparada na academia para recuperar fôlego, reduzir ferimentos leves e oferecer reforço temporário em situações críticas.",
      use: "Consumível. Ideal para cenas de combate, fuga ou resgate.",
      attributes: [
        { label: "ATAQUE", value: "+0" },
        { label: "DEFESA", value: "+2" },
        { label: "CURA", value: "+3" },
        { label: "DURAÇÃO", value: "1 cena" }
      ],
      tags: ["Consumível", "Cura", "Alquimia"]
    },
    {
      id: "adaga-ritual",
      code: "ARM-01",
      name: "ADAGA RITUAL",
      category: "ARMAS",
      categories: ["armas"],
      rarity: "RARO",
      status: "DISPONÍVEL",
      stock: "1 / 2",
      xpCost: "160 XP",
      image: "./assets/inventario/adaga.svg",
      summary: "Lâmina curta consagrada para ritos, combates rápidos e defesa aproximada.",
      description: "Uma adaga equilibrada, gravada com sigilos de proteção e uso ritualístico. Serve tanto para combate quanto para cerimônias mágicas específicas.",
      use: "Aumenta dano corpo a corpo e pode desbloquear cenas ritualísticas exclusivas.",
      attributes: [
        { label: "ATAQUE", value: "+4" },
        { label: "DEFESA", value: "+1" },
        { label: "PRECISÃO", value: "+2" },
        { label: "DURAÇÃO", value: "Permanente" }
      ],
      tags: ["Combate", "Ritual", "Lâmina"]
    },
    {
      id: "amuleto-de-protecao",
      code: "MAG-03",
      name: "AMULETO DE PROTEÇÃO",
      category: "ITENS MÁGICOS",
      categories: ["itens-magicos"],
      rarity: "RARO",
      status: "DISPONÍVEL",
      stock: "3 / 5",
      xpCost: "140 XP",
      image: "./assets/inventario/amuleto.svg",
      summary: "Talismã passivo que reduz interferências espirituais e danos sobrenaturais.",
      description: "Um amuleto encantado para repelir energia hostil, suavizar maldições leves e oferecer proteção contínua contra ameaças ocultas.",
      use: "Equipável. Funciona em combate, exploração e investigações paranormais.",
      attributes: [
        { label: "ATAQUE", value: "+0" },
        { label: "DEFESA", value: "+4" },
        { label: "RESISTÊNCIA", value: "+2" },
        { label: "DURAÇÃO", value: "Permanente" }
      ],
      tags: ["Proteção", "Talismã", "Passivo"]
    },
    {
      id: "impulso-arcano",
      code: "HAB-01",
      name: "IMPULSO ARCANO",
      category: "HABILIDADES",
      categories: ["habilidades"],
      rarity: "INCOMUM",
      status: "DISPONÍVEL",
      stock: "ATIVA",
      xpCost: "120 XP",
      image: "./assets/inventario/sigilo.svg",
      summary: "Habilidade temporária que aumenta o rendimento de feitiços por uma cena.",
      description: "Canaliza energia arcana extra para elevar a potência de uma habilidade ou ritual já dominado pela personagem.",
      use: "Ativável. Excelente para cenas decisivas ou combates mais intensos.",
      attributes: [
        { label: "ATAQUE", value: "+2" },
        { label: "DEFESA", value: "+0" },
        { label: "SUPORTE", value: "+2" },
        { label: "DURAÇÃO", value: "1 cena" }
      ],
      tags: ["Buff", "Habilidade", "Temporário"]
    },
    {
      id: "vela-de-sentinela",
      code: "MAG-04",
      name: "VELA DE SENTINELA",
      category: "ITENS MÁGICOS",
      categories: ["itens-magicos"],
      rarity: "COMUM",
      status: "DISPONÍVEL",
      stock: "6 / 10",
      xpCost: "60 XP",
      image: "./assets/inventario/vela.svg",
      summary: "Objeto ritual de alerta e observação para detectar invasões ou presenças.",
      description: "Quando ativada em um espaço, a vela reage a movimentações incomuns, entidades e rupturas mágicas nas proximidades.",
      use: "Perfeita para vigília, defesa de locais e preparação de cenas investigativas.",
      attributes: [
        { label: "ATAQUE", value: "+0" },
        { label: "DEFESA", value: "+1" },
        { label: "UTILIDADE", value: "+3" },
        { label: "DURAÇÃO", value: "2 cenas" }
      ],
      tags: ["Alerta", "Ritual", "Utilidade"]
    },
    {
      id: "reliquia-vodu",
      code: "MAG-05",
      name: "RELÍQUIA VODU",
      category: "ITENS MÁGICOS",
      categories: ["itens-magicos"],
      rarity: "ÉPICO",
      status: "LIMITADO",
      stock: "1 / 1",
      xpCost: "230 XP",
      image: "./assets/inventario/reliquia.svg",
      summary: "Artefato ritualístico raro ligado a bênçãos, pactos e condução espiritual.",
      description: "Uma relíquia poderosa que serve de âncora para trabalhos espirituais, respostas oraculares e amplificação de rituais de origem vodu.",
      use: "Ideal para personagens ligados ao vodu, aos loa ou a ritos ancestrais.",
      attributes: [
        { label: "ATAQUE", value: "+1" },
        { label: "DEFESA", value: "+2" },
        { label: "SUPORTE", value: "+4" },
        { label: "DURAÇÃO", value: "3 cenas" }
      ],
      tags: ["Vodu", "Relíquia", "Ritual"]
    },
    {
      id: "talisma-da-pressa",
      code: "HAB-02",
      name: "TALISMÃ DA PRESSA",
      category: "HABILIDADES",
      categories: ["habilidades"],
      rarity: "INCOMUM",
      status: "DISPONÍVEL",
      stock: "2 / 5",
      xpCost: "110 XP",
      image: "./assets/inventario/talisma.svg",
      summary: "Concede um reforço momentâneo de velocidade, esquiva e reposicionamento.",
      description: "Este talismã libera energia aceleradora por um curto período, permitindo escapar, perseguir ou reposicionar-se com mais eficiência.",
      use: "Ótimo para fuga, perseguição e ações rápidas em combate.",
      attributes: [
        { label: "ATAQUE", value: "+1" },
        { label: "DEFESA", value: "+2" },
        { label: "MOBILIDADE", value: "+4" },
        { label: "DURAÇÃO", value: "1 cena" }
      ],
      tags: ["Mobilidade", "Temporário", "Buff"]
    },
    {
      id: "revolver-consagrado",
      code: "ARM-02",
      name: "REVÓLVER CONSAGRADO",
      category: "ARMAS",
      categories: ["armas"],
      rarity: "RARO",
      status: "BLOQUEADO",
      stock: "LOCKED",
      locked: true,
      xpCost: "210 XP",
      image: "./assets/inventario/revolver.svg",
      summary: "Arma reforçada para uso contra criaturas e entidades sobrenaturais.",
      description: "Um revólver preparado com munição consagrada, ideal para caçadores e confrontos contra alvos resistentes à violência comum.",
      use: "Aumenta dano à distância e eficácia contra inimigos sobrenaturais.",
      attributes: [
        { label: "ATAQUE", value: "+5" },
        { label: "DEFESA", value: "+0" },
        { label: "PRECISÃO", value: "+3" },
        { label: "DURAÇÃO", value: "Permanente" }
      ],
      tags: ["Arma", "Caçadores", "À distância"]
    }
  ]
};
