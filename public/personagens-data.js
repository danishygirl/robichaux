/*
  ============================================================
  COVEN — DADOS DA PÁGINA PERSONAGENS
  ============================================================

  Este arquivo concentra o conteúdo editável da página.
  Você NÃO precisa criar HTML para cada novo personagem.

  COMO ADICIONAR UM PERSONAGEM
  1. Copie um objeto inteiro dentro de "characters".
  2. Troque o "id" por um valor único.
  3. Troque nome, foto e demais informações.
  4. Escolha a "categoria" usada pelos filtros.

  COMO ADICIONAR/REMOVER FILTROS
  Edite "page.filters". O id do filtro deve ser igual ao valor
  usado em "categoria" (ou em "categorias") dos personagens.

  Exemplo:
    { id: "bruxas", label: "BRUXAS" }

  Personagem:
    categoria: "bruxas"

  Um personagem também pode pertencer a mais de uma categoria:
    categorias: ["bruxas", "criaturas"]

  CAMPOS OPCIONAIS
  idade, classe, nivel, poder, historia, deck e extras podem ser
  apagados. O dossiê esconde automaticamente campos inexistentes.

  "poder" pode ser texto ou lista:
    poder: "Telecinese"
    poder: ["Telecinese", "Pirocinese"]

  "deck" é uma lista com quantos itens você quiser.

  Para informações adicionais use "extras":
    extras: [
      { label: "AFILIAÇÃO", value: "Academia Robichaux" },
      { label: "STATUS", value: "Ativa" }
    ]
*/

window.COVEN_CHARACTERS = {
  page: {
    eyebrow: "ROBICHAUX ARCHIVE // PERSONNEL",
    title: "PERSONAGENS",
    subtitle: "REGISTROS ATIVOS E ARQUIVOS DE NOVA ORLEANS",

    // A ordem aqui é a ordem visual dos botões de filtro.
    filters: [
      { id: "todos", label: "TODOS" },
      { id: "bruxas", label: "BRUXAS" },
      { id: "bruxos", label: "BRUXOS" },
      { id: "civis", label: "CIVIS" },
      { id: "cacadores", label: "CAÇADORES" },
      { id: "criaturas", label: "CRIATURAS" }
    ]
  },

  characters: [
    {
      id: "personagem-01",
      nome: "NOME DA PERSONAGEM",
      idade: "24",
      classe: "BRUXA",
      nivel: "07",
      categoria: "bruxas",
      poder: ["Telecinese", "Descendum"],
      historia: "Escreva aqui a história da personagem. O texto pode ser curto ou longo; a área do dossiê possui rolagem automática quando necessário.",
      deck: [
        "Grimório pessoal",
        "Talismã de proteção",
        "2 poções de restauração"
      ],
      imagem: "./assets/personagens/personagem-01.svg",
      codigo: "RCX-001",
      extras: [
        { label: "AFILIAÇÃO", value: "Academia Robichaux" }
      ]
    },
    {
      id: "personagem-02",
      nome: "NOME DO PERSONAGEM",
      idade: "31",
      classe: "CIVIL",
      nivel: "03",
      categoria: "civis",
      poder: "—",
      historia: "Use este registro como modelo para civis, caçadores, médiuns ou qualquer outra categoria do RPG. Campos podem ser removidos livremente do arquivo de dados.",
      deck: [
        "Chaves do apartamento",
        "Câmera analógica",
        "Caderno de anotações"
      ],
      imagem: "./assets/personagens/personagem-02.svg",
      codigo: "NOLA-017"
    },
    {
      id: "personagem-03",
      nome: "NOME DA PERSONAGEM",
      idade: "28",
      classe: "CAÇADORA",
      nivel: "05",
      categoria: "cacadores",
      poder: "Rastreamento ritualístico",
      historia: "O terceiro cartão mostra como diferentes classes podem coexistir no mesmo arquivo visual sem alterar o layout. Troque nome, foto e informações diretamente neste arquivo.",
      deck: [
        "Kit de investigação",
        "Mapa de Nova Orleans",
        "Amuleto desconhecido"
      ],
      imagem: "./assets/personagens/personagem-03.svg",
      codigo: "HNT-009",
      extras: [
        { label: "ORIGEM", value: "Desconhecida" }
      ]
    }
  ]
};
