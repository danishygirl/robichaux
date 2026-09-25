/*
  ============================================================
  COVEN — DADOS DA PÁGINA MAPA
  ============================================================

  Este arquivo controla TODOS os locais da página.

  PARA ADICIONAR UM LOCAL
  1. Copie um objeto inteiro dentro de "places".
  2. Dê um id único.
  3. Troque nome, bairro, descrição e imagem.
  4. Salve sua imagem em public/assets/mapa/.

  Exemplo de imagem real:
    image: "./assets/mapa/french-quarter.webp"

  Você pode usar WEBP, JPG ou PNG. WEBP é recomendado para manter
  a página leve.

  CAMPOS OPCIONAIS
  district, code, tags e extras podem ser removidos. Se faltarem,
  a interface se reorganiza automaticamente.
*/

window.COVEN_MAP = {
  page: {
    eyebrow: "NEW ORLEANS // LOCATION ARCHIVE",
    title: "MAPA",
    subtitle: "GUIA DE CENÁRIOS, TERRITÓRIOS E PONTOS DE INTERESSE DA TRAMA"
  },

  places: [
    {
      id: "academia-robichaux",
      name: "ACADEMIA ROBICHAUX",
      district: "GARDEN DISTRICT",
      code: "NOLA-01",
      image: "./assets/mapa/robichaux.webp",
      description: "A mansão que abriga o coração do Coven. Entre salões antigos, corredores silenciosos e jardins protegidos por magia, a academia funciona como residência, refúgio e centro de treinamento para jovens bruxas.",
      tags: ["Coven", "Residência", "Zona protegida"],
      extras: [
        { label: "ACESSO", value: "Restrito" },
        { label: "RISCO", value: "Moderado" },
        { label: "CONTROLE", value: "Coven" }
      ]
    },
    {
      id: "french-quarter",
      name: "FRENCH QUARTER",
      district: "VIEUX CARRÉ",
      code: "NOLA-02",
      image: "./assets/mapa/frenchquarter.webp",
      description: "O centro histórico de New Orleans concentra música, turistas, casarões antigos e histórias que se recusam a morrer. Para os sobrenaturais, suas ruas funcionam como ponto de encontro, caça e negociação.",
      tags: ["Urbano", "Movimentado", "Sobrenatural"],
      extras: [
        { label: "ACESSO", value: "Público" },
        { label: "RISCO", value: "Variável" },
        { label: "ATIVIDADE", value: "Alta" }
      ]
    },
    {
      id: "garden-district",
      name: "GARDEN DISTRICT",
      district: "UPTOWN",
      code: "NOLA-03",
      image: "./assets/mapa/gardendistrict.webp",
      description: "Casarões imponentes, jardins fechados e famílias antigas fazem do Garden District uma região marcada por prestígio e segredos. Muitas propriedades guardam histórias que nunca chegaram aos registros oficiais.",
      tags: ["Residencial", "Elite", "Histórico"],
      extras: [
        { label: "ACESSO", value: "Público / privado" },
        { label: "RISCO", value: "Baixo a moderado" }
      ]
    },
    {
      id: "lafayette-cemetery",
      name: "LAFAYETTE CEMETERY",
      district: "GARDEN DISTRICT",
      code: "NOLA-04",
      image: "./assets/mapa/lafayette-cemetery.svg",
      description: "Um labirinto de túmulos elevados, mausoléus e nomes esquecidos. À noite, o silêncio do cemitério se torna pesado e antigas práticas funerárias parecem deixar rastros no ar.",
      tags: ["Cemitério", "Espiritual", "Ritual"],
      extras: [
        { label: "ACESSO", value: "Controlado" },
        { label: "RISCO", value: "Alto após o anoitecer" },
        { label: "ATIVIDADE", value: "Espiritual" }
      ]
    },
    {
      id: "jackson-square",
      name: "JACKSON SQUARE",
      district: "FRENCH QUARTER",
      code: "NOLA-05",
      image: "./assets/mapa/jackson-square.svg",
      description: "Praça histórica cercada por arte, música e movimento constante. Leituras de cartas, artistas de rua e pequenas manifestações mágicas podem se esconder perfeitamente entre a multidão.",
      tags: ["Praça", "Público", "Encontros"],
      extras: [
        { label: "ACESSO", value: "Público" },
        { label: "RISCO", value: "Moderado" }
      ]
    },
    {
      id: "bourbon-street",
      name: "BOURBON STREET",
      district: "FRENCH QUARTER",
      code: "NOLA-06",
      image: "./assets/mapa/bourbon-street.svg",
      description: "Neon, música, álcool e multidões tornam Bourbon Street um cenário perfeito para desaparecer à vista de todos. Criaturas, caçadores e oportunistas atravessam as mesmas portas sem saber exatamente quem está ao lado.",
      tags: ["Vida noturna", "Caos", "Caça"],
      extras: [
        { label: "ACESSO", value: "Público" },
        { label: "RISCO", value: "Alto" },
        { label: "HORÁRIO", value: "Noturno" }
      ]
    },
    {
      id: "bayou-st-john",
      name: "BAYOU ST. JOHN",
      district: "MID-CITY",
      code: "NOLA-07",
      image: "./assets/mapa/bayou-st-john.svg",
      description: "Água escura, margens silenciosas e uma história profundamente ligada às tradições locais tornam o Bayou St. John um ponto natural para encontros discretos, rituais e passagens clandestinas.",
      tags: ["Bayou", "Ritual", "Travessia"],
      extras: [
        { label: "ACESSO", value: "Público" },
        { label: "RISCO", value: "Moderado" },
        { label: "TERRENO", value: "Aquático" }
      ]
    },
    {
      id: "pantanos",
      name: "OS PÂNTANOS",
      district: "OUTSKIRTS",
      code: "NOLA-08",
      image: "./assets/mapa/pantanos.svg",
      description: "Fora das ruas iluminadas, os pântanos formam um território onde distância, silêncio e vegetação escondem aquilo que não deseja ser encontrado. É um lugar de criaturas, desaparecimentos e pactos antigos.",
      tags: ["Selvagem", "Criaturas", "Perigoso"],
      extras: [
        { label: "ACESSO", value: "Difícil" },
        { label: "RISCO", value: "Extremo" },
        { label: "CONTROLE", value: "Desconhecido" }
      ]
    },
    {
      id: "distrito-vodu",
      name: "DISTRITO VOODOO",
      district: "TREME / FRENCH QUARTER",
      code: "NOLA-09",
      image: "./assets/mapa/distrito-vodu.svg",
      description: "Uma rede de lojas, casas, altares e espaços ritualísticos onde tradições espirituais permanecem vivas. O território não pertence ao Coven e exige respeito a regras que raramente são anunciadas em voz alta.",
      tags: ["Vodu", "Espiritual", "Território"],
      extras: [
        { label: "ACESSO", value: "Condicional" },
        { label: "RISCO", value: "Alto para intrusos" },
        { label: "CONTROLE", value: "Comunidades locais" }
      ]
    },
    {
      id: "mansao-abandonada",
      name: "MANSÃO ABANDONADA",
      district: "LOCALIZAÇÃO NÃO REGISTRADA",
      code: "NOLA-10",
      image: "./assets/mapa/mansao-abandonada.svg",
      description: "Uma propriedade antiga oficialmente vazia. Janelas fechadas, móveis cobertos e sinais recentes de presença transformaram a mansão em um ponto recorrente de rumores e investigações do Coven.",
      tags: ["Investigação", "Ruínas", "Mistério"],
      extras: [
        { label: "ACESSO", value: "Proibido" },
        { label: "RISCO", value: "Desconhecido" },
        { label: "STATUS", value: "Sob investigação" }
      ]
    }
  ]
};
