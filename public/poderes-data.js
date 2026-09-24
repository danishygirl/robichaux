/*
  ============================================================
  COVEN — DADOS DA PÁGINA PODERES
  ============================================================

  Tudo desta página é editável neste arquivo.

  COMO ADICIONAR UM NOVO PODER
  1. Copie um objeto inteiro dentro de "powers".
  2. Troque o "id" por um valor único.
  3. Defina a categoria usada nos filtros.
  4. Preencha nome, descrição e os níveis.

  FILTROS
  Edite "page.filters" para adicionar/remover categorias visuais.

  CATEGORIAS
  Um poder pode ter uma "categoria" única:
    categoria: "bruxas"

  ou várias categorias:
    categorias: ["vudu", "criaturas"]

  NÍVEIS
  O campo "levels" aceita do nível 1 ao 7, mas você pode adaptar.
  Cada nível pode ter:
    level: 1,
    xp: "0 XP",
    title: "Despertar",
    description: "Texto do nível."

  CAMPOS OPCIONAIS
  symbol, family, origin, unlock, tags e extras podem ser apagados.

  EXTRAS
    extras: [
      { label: "RISCO", value: "Exaustão física" },
      { label: "CANALIZAÇÃO", value: "Foco visual" }
    ]
*/

window.COVEN_POWERS = {
  page: {
    eyebrow: "ROBICHAUX ARCHIVE // ARCANE",
    title: "PODERES",
    subtitle: "SETE MARAVILHAS, HABILIDADES RITUALÍSTICAS E REGISTROS CUSTOMIZÁVEIS",
    filters: [
      { id: "todos", label: "TODOS" },
      { id: "seven-wonders", label: "SEVEN WONDERS" },
      { id: "bruxas", label: "BRUXAS" },
      { id: "vudu", label: "VODU" },
      { id: "cacadores", label: "CAÇADORES" },
      { id: "criaturas", label: "CRIATURAS" }
    ]
  },

  powers: [
    {
      id: "telecinese",
      codigo: "SW-01",
      nome: "TELECINESE",
      family: "SEVEN WONDERS",
      origin: "BRUXAS",
      categorias: ["seven-wonders", "bruxas"],
      symbol: "✦",
      image: "assets/poderes/telecinese.webp",
      summary: "Mover objetos, corpos e barreiras apenas com a força da mente.",
      description: "A Telecinese é uma das Sete Maravilhas e representa o controle mental sobre a matéria. No RPG, pode servir tanto para combate quanto para investigação, defesa e manipulação precisa do ambiente.",
      unlock: "Disponível para bruxas com treinamento arcano. Cada novo nível exige foco, disciplina e gasto de XP acumulado.",
      tags: ["Controle", "Combate", "Precisão"],
      extras: [
        { label: "RISCO", value: "Perda de controle sob estresse extremo." },
        { label: "ALCANCE", value: "Curto a médio, aumentando com o nível." }
      ],
      levels: [
        { level: 1, xp: "0 XP", title: "Despertar", description: "Move objetos muito leves e produz pequenos impulsos de força." },
        { level: 2, xp: "120 XP", title: "Impulso", description: "Consegue empurrar alvos desatentos e manipular armas pequenas." },
        { level: 3, xp: "280 XP", title: "Estabilidade", description: "Mantém vários objetos no ar ao mesmo tempo sem perder precisão." },
        { level: 4, xp: "520 XP", title: "Pressão", description: "Aplica impacto direto em combate e rompe fechaduras ou obstáculos frágeis." },
        { level: 5, xp: "860 XP", title: "Domínio", description: "Arremessa alvos, cria defesas rápidas e sustenta barreiras de emergência." },
        { level: 6, xp: "1300 XP", title: "Subjugação", description: "Manipula grandes massas e altera a trajetória de ataques físicos." },
        { level: 7, xp: "1900 XP", title: "Maestria", description: "Controla o campo ao redor com força ampla, veloz e extremamente precisa." }
      ]
    },
    {
      id: "concilium",
      codigo: "SW-02",
      nome: "CONCILIUM",
      family: "SEVEN WONDERS",
      origin: "BRUXAS",
      categorias: ["seven-wonders", "bruxas"],
      symbol: "◎",
      summary: "Subjugar a vontade de outra pessoa por meio de comando mental.",
      description: "O Concilium permite influenciar ações, forçar respostas ou impor ordens temporárias. Quanto maior o nível, mais difícil é resistir ao comando e mais complexo pode ser o comportamento exigido da vítima.",
      unlock: "Exige forte presença mental. Alvos com grande resistência mágica ou emocional podem impor testes adicionais.",
      tags: ["Domínio", "Influência", "Social"],
      extras: [
        { label: "LIMITAÇÃO", value: "Ordens absurdas ou suicidas tendem a encontrar resistência." }
      ],
      levels: [
        { level: 1, xp: "0 XP", title: "Sussurro", description: "Induz ações simples em alvos distraídos." },
        { level: 2, xp: "140 XP", title: "Impulso", description: "Consegue alterar respostas rápidas e comportamentos curtos." },
        { level: 3, xp: "320 XP", title: "Comando", description: "Mantém influência por mais tempo e com menos esforço visível." },
        { level: 4, xp: "560 XP", title: "Pressão", description: "Afeta alvos hostis com comandos mais específicos." },
        { level: 5, xp: "910 XP", title: "Submissão", description: "Sustenta múltiplas ordens encadeadas em uma mesma cena." },
        { level: 6, xp: "1380 XP", title: "Supressão", description: "Impõe silêncio, recuo ou cooperação sob forte tensão." },
        { level: 7, xp: "1980 XP", title: "Imperium", description: "Exerce domínio mental refinado mesmo em situações caóticas." }
      ]
    },
    {
      id: "transmutacao",
      codigo: "SW-03",
      nome: "TRANSMUTAÇÃO",
      family: "SEVEN WONDERS",
      origin: "BRUXAS",
      categorias: ["seven-wonders", "bruxas"],
      symbol: "◇",
      summary: "Mover-se de um lugar a outro quase instantaneamente.",
      description: "A Transmutação é a capacidade de desaparecer de um ponto e reaparecer em outro. Em níveis baixos a distância é limitada; em níveis altos, a bruxa domina melhor o salto, o risco e a precisão da chegada.",
      unlock: "Pode exigir linha de visão, vínculo prévio com o local ou concentração total, conforme a regra da mesa.",
      tags: ["Mobilidade", "Fuga", "Infiltração"],
      levels: [
        { level: 1, xp: "0 XP", title: "Salto curto", description: "Percorre poucos metros e exige foco total." },
        { level: 2, xp: "130 XP", title: "Reposição", description: "Consegue ajustar melhor o ponto exato de chegada." },
        { level: 3, xp: "300 XP", title: "Travessia", description: "Vence barreiras simples e distâncias moderadas." },
        { level: 4, xp: "540 XP", title: "Ruptura", description: "Usa o salto em combate ou perseguições com menos risco." },
        { level: 5, xp: "900 XP", title: "Precisão", description: "Chega com controle quase total de postura e direção." },
        { level: 6, xp: "1360 XP", title: "Passagem", description: "Atressa ambientes complexos e resgata aliados próximos." },
        { level: 7, xp: "1940 XP", title: "Maestria espacial", description: "Executa transposições longas com altíssima estabilidade." }
      ]
    },
    {
      id: "divinacao",
      codigo: "SW-04",
      nome: "ADIVINHAÇÃO",
      family: "SEVEN WONDERS",
      origin: "BRUXAS",
      categorias: ["seven-wonders", "bruxas"],
      symbol: "✧",
      summary: "Obter conhecimento oculto por leitura psíquica, sensorial ou ritualística.",
      description: "A Adivinhação revela o que está escondido: rastros, memórias, eventos passados, respostas simbólicas e até presságios. Pode ser usada com cartas, objetos, toque, sonhos ou ritos, dependendo da personagem.",
      unlock: "Quanto mais específico o alvo ou a pergunta, maior a chance de leitura limpa e útil.",
      tags: ["Investigação", "Oculto", "Oráculo"],
      levels: [
        { level: 1, xp: "0 XP", title: "Vislumbre", description: "Percebe emoções residuais e presságios leves." },
        { level: 2, xp: "120 XP", title: "Leitura", description: "Interpreta objetos e locais com maior clareza." },
        { level: 3, xp: "290 XP", title: "Rastro", description: "Segue ecos mágicos ou ligações espirituais recentes." },
        { level: 4, xp: "520 XP", title: "Janela", description: "Capta eventos passados importantes ligados ao alvo." },
        { level: 5, xp: "860 XP", title: "Presságio", description: "Recebe avisos mais objetivos sobre riscos e escolhas." },
        { level: 6, xp: "1300 XP", title: "Revelação", description: "Lê estruturas ocultas de rituais, pactos e maldições." },
        { level: 7, xp: "1880 XP", title: "Oráculo completo", description: "Obtém respostas profundas, mesmo de fontes fortemente veladas." }
      ]
    },
    {
      id: "vitalum-vitalis",
      codigo: "SW-05",
      nome: "VITALUM VITALIS",
      family: "SEVEN WONDERS",
      origin: "BRUXAS",
      categorias: ["seven-wonders", "bruxas"],
      symbol: "✚",
      summary: "Canalizar energia vital para curar, restaurar ou reanimar.",
      description: "Vitalum Vitalis envolve manipular a força vital de si mesma ou de outras pessoas. Pode estabilizar ferimentos, reverter danos graves e, em níveis superiores, realizar feitos extremos de restauração com custo elevado.",
      unlock: "Curas maiores costumam cobrar preço físico, mágico ou narrativo da usuária. Ajuste esse custo livremente no RPG.",
      tags: ["Suporte", "Cura", "Sacrifício"],
      extras: [
        { label: "CUSTO", value: "Pode causar exaustão ou desgaste mágico severo." }
      ],
      levels: [
        { level: 1, xp: "0 XP", title: "Estabilização", description: "Reduz dor e interrompe danos leves." },
        { level: 2, xp: "150 XP", title: "Recuperação", description: "Fecha cortes e trata ferimentos moderados." },
        { level: 3, xp: "340 XP", title: "Restauração", description: "Acelera cura e devolve mobilidade parcial." },
        { level: 4, xp: "600 XP", title: "Transferência", description: "Compartilha parte da própria energia com outro alvo." },
        { level: 5, xp: "980 XP", title: "Renovação", description: "Reverte traumas graves sob grande custo mágico." },
        { level: 6, xp: "1460 XP", title: "Reanimação", description: "Sustenta ritos extremos de retorno ou restauração profunda." },
        { level: 7, xp: "2100 XP", title: "Milagre arcano", description: "Opera no limiar entre vida, morte e renascimento ritualístico." }
      ]
    },
    {
      id: "descensum",
      codigo: "SW-06",
      nome: "DESCENSUM",
      family: "SEVEN WONDERS",
      origin: "BRUXAS",
      categorias: ["seven-wonders", "bruxas"],
      symbol: "◐",
      summary: "Projetar-se ao plano astral ou descer a regiões espirituais profundas.",
      description: "Descensum é a descida controlada a estados astrais, liminares ou infernais. Em níveis mais altos, a personagem navega melhor pelo retorno, resiste a influências hostis e explora regiões cada vez mais perigosas.",
      unlock: "Sempre envolve risco narrativo. Falhas podem gerar perda de tempo, influência sombria ou danos psíquicos.",
      tags: ["Astral", "Ritual", "Risco"],
      extras: [
        { label: "AMEAÇA", value: "Entidades ou ecos podem seguir a personagem de volta." }
      ],
      levels: [
        { level: 1, xp: "0 XP", title: "Transe", description: "Entra em estado de descida breve com supervisão." },
        { level: 2, xp: "160 XP", title: "Imersão", description: "Permanece mais tempo em zonas espirituais rasas." },
        { level: 3, xp: "360 XP", title: "Contato", description: "Coleta informações e identifica presenças no plano." },
        { level: 4, xp: "620 XP", title: "Travessia", description: "Explora regiões instáveis com chance menor de se perder." },
        { level: 5, xp: "1020 XP", title: "Âncora", description: "Retorna com mais segurança e resiste a possessões sutis." },
        { level: 6, xp: "1520 XP", title: "Descida profunda", description: "Suporta áreas hostis e vínculos mais pesados." },
        { level: 7, xp: "2200 XP", title: "Senhora do limiar", description: "Navega o mundo astral com maestria e enorme resistência." }
      ]
    },
    {
      id: "pirocinese",
      codigo: "SW-07",
      nome: "PIROCINESE",
      family: "SEVEN WONDERS",
      origin: "BRUXAS",
      categorias: ["seven-wonders", "bruxas"],
      symbol: "✹",
      summary: "Acender, controlar e intensificar chamas por vontade arcana.",
      description: "A Pirocinese representa domínio direto sobre o fogo. Pode ser usada para intimidação, destruição, rituais e purificação. Em níveis altos, a chama responde com velocidade, volume e precisão muito maiores.",
      unlock: "Em muitas mesas é tratada como um dom raro entre as bruxas, geralmente associado a forte instabilidade emocional.",
      tags: ["Ataque", "Área", "Intimidação"],
      extras: [
        { label: "RISCO", value: "Emoções intensas podem ampliar o dano colateral." }
      ],
      levels: [
        { level: 1, xp: "0 XP", title: "Faísca", description: "Produz calor e pequenas chamas em objetos frágeis." },
        { level: 2, xp: "140 XP", title: "Brasa", description: "Mantém fogo em mãos, velas e superfícies pequenas." },
        { level: 3, xp: "320 XP", title: "Lâmina de fogo", description: "Arremessa focos curtos e controla a direção da chama." },
        { level: 4, xp: "570 XP", title: "Incêndio tático", description: "Cria zonas de fogo e corta rotas inimigas." },
        { level: 5, xp: "940 XP", title: "Forja", description: "Sustenta chamas poderosas por mais tempo e com mais estabilidade." },
        { level: 6, xp: "1400 XP", title: "Tempestade ígnea", description: "Manipula múltiplas fontes de fogo em ritmo de combate." },
        { level: 7, xp: "2000 XP", title: "Maestria ígnea", description: "Exerce domínio devastador sobre grandes massas de chama." }
      ]
    },
    {
      id: "vinculo-loa",
      codigo: "VDU-01",
      nome: "VÍNCULO COM LOA",
      family: "VODU",
      origin: "VODU",
      categorias: ["vudu"],
      symbol: "☽",
      summary: "Canalizar orientação, proteção ou favores de um loa específico.",
      description: "Este é um exemplo de poder fora das Seven Wonders. Use-o como modelo para qualquer linhagem de vodu, sacerdócio ou pacto espiritual que exista no seu RPG.",
      unlock: "Requer iniciação, objeto ritual ou vínculo narrativo com a entidade cultuada.",
      tags: ["Ritual", "Espiritual", "Suporte"],
      levels: [
        { level: 1, xp: "0 XP", title: "Chamado", description: "Percebe sinais e aceitações do loa." },
        { level: 2, xp: "120 XP", title: "Benção", description: "Recebe proteção leve ou orientação ritual." },
        { level: 3, xp: "300 XP", title: "Intercessão", description: "O vínculo concede auxílio funcional em cena." },
        { level: 4, xp: "560 XP", title: "Oferta", description: "Obtém favores maiores mediante preço ou sacrifício." },
        { level: 5, xp: "900 XP", title: "Passagem", description: "Canaliza manifestações mais evidentes do loa." },
        { level: 6, xp: "1360 XP", title: "Guarda", description: "Conjura proteção espiritual robusta ou resposta ofensiva." },
        { level: 7, xp: "1940 XP", title: "Coroação", description: "O loa age através do vínculo com imensa potência." }
      ]
    },
    {
      id: "bencao-consagrada",
      codigo: "HNT-01",
      nome: "BÊNÇÃO CONSAGRADA",
      family: "CAÇADORES",
      origin: "CAÇADORES",
      categorias: ["cacadores"],
      symbol: "✠",
      summary: "Marcar, consagrar e enfraquecer ameaças sobrenaturais.",
      description: "Modelo de poder para caçadores, exorcistas ou ordens religiosas. Mistura preparação ritual com aplicação prática em confrontos contra criaturas e magia hostil.",
      unlock: "Pode depender de relíquias, óleo sagrado, reza ou treinamento disciplinar específico.",
      tags: ["Ritual", "Defesa", "Anti-sobrenatural"],
      levels: [
        { level: 1, xp: "0 XP", title: "Selo", description: "Marca portas, armas ou objetos contra presenças leves." },
        { level: 2, xp: "110 XP", title: "Guarda", description: "Reforça proteção pessoal ou de um aliado." },
        { level: 3, xp: "270 XP", title: "Expurgo", description: "Reduz a ação de entidades menores." },
        { level: 4, xp: "500 XP", title: "Repreensão", description: "Enfraquece maldições ou barreiras profanas em cena." },
        { level: 5, xp: "820 XP", title: "Lâmina santa", description: "Amplia o dano ou a eficácia de armas consagradas." },
        { level: 6, xp: "1260 XP", title: "Santuário", description: "Ergue zona segura temporária contra o sobrenatural." },
        { level: 7, xp: "1840 XP", title: "Julgamento", description: "Canaliza poder máximo de banimento e contenção." }
      ]
    },
    {
      id: "glamour-predatorio",
      codigo: "CRT-01",
      nome: "GLAMOUR PREDATÓRIO",
      family: "CRIATURAS",
      origin: "CRIATURAS",
      categorias: ["criaturas"],
      symbol: "◈",
      summary: "Alterar presença, aparência ou percepção para seduzir, caçar ou ocultar-se.",
      description: "Modelo de habilidade para vampiros, fadas sombrias, sereias, metamorfos ou outras criaturas. Funciona como exemplo de poder customizável fora do eixo das bruxas.",
      unlock: "Pode ser nato da espécie ou evoluir por alimentação, idade ou rituais próprios.",
      tags: ["Fascínio", "Ilusão", "Predação"],
      levels: [
        { level: 1, xp: "0 XP", title: "Presença", description: "Desperta magnetismo sobrenatural discreto." },
        { level: 2, xp: "130 XP", title: "Máscara", description: "Altera pequenos detalhes da aparência e da voz." },
        { level: 3, xp: "300 XP", title: "Fascínio", description: "Aumenta a chance de sedução, distração ou disfarce." },
        { level: 4, xp: "540 XP", title: "Véu", description: "Oculta natureza monstruosa diante de observadores comuns." },
        { level: 5, xp: "880 XP", title: "Isca", description: "Atraí alvos com força sobrenatural mais intensa." },
        { level: 6, xp: "1340 XP", title: "Metamorfose parcial", description: "Produz mudança física mais drástica ou aterradora." },
        { level: 7, xp: "1920 XP", title: "Encanto supremo", description: "Controla a própria imagem e o impacto sensorial com maestria." }
      ]
    }
  ]
};
