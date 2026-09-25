/* COVEN — EPISÓDIOS
   Edite este arquivo para adicionar/remover episódios, quests, missões,
   objetivos, recompensas, posters e backgrounds.
   poster = imagem do card principal. background = imagem com baixa opacidade
   atrás da descrição na subpágina. JPG, PNG e WebP funcionam normalmente. */
window.COVEN_EPISODES = {
  page: {
    eyebrow: "ROBICHAUX ARCHIVE // CHRONICLES",
    title: "EPISÓDIOS",
    subtitle: "CRÔNICAS, QUESTS E MISSÕES DA CAMPANHA",
    modes: [{ id: "main", label: "MAIN QUESTS" }, { id: "missions", label: "MISSÕES" }]
  },
  episodes: [
    {
      id: "episodio-01", number: "EPISÓDIO I", title: "A CASA QUE ESCUTA", status: "ATIVO", progress: "1 / 4",
      poster: "./assets/episodios/ep01.svg", background: "./assets/episodios/bg-academia.svg",
      synopsis: "Ruídos surgem nas paredes da Academia Robichaux enquanto um antigo selo começa a responder às novas bruxas.",
      mainQuests: [
        { id:"vozes-na-parede", code:"MQ-01", title:"VOZES NA PAREDE", state:"EM ANDAMENTO", description:"Depois da meia-noite, a Academia começa a repetir vozes de antigas moradoras. As palavras parecem desconexas, até que uma das paredes do corredor leste responde ao nome de uma das novas bruxas.", objectives:[{text:"Investigar o corredor leste depois da meia-noite.",completed:true},{text:"Encontrar a origem das vozes dentro da parede.",completed:false},{text:"Descobrir qual nome está sendo repetido pelo selo.",completed:false}], rewards:[{type:"xp",label:"+250 XP"},{type:"item",label:"Sal Negro",image:"./assets/episodios/item-sal-negro.svg"},{type:"ability",label:"Pista: Visão Residual"}], notes:"A conclusão desta quest libera a próxima etapa da investigação na Academia." },
        { id:"o-selo-rachado", code:"MQ-02", title:"O SELO RACHADO", state:"BLOQUEADA", description:"Um selo de proteção gravado abaixo da escadaria principal apresenta uma fissura recente. Há sinais de que algo tentou atravessá-lo de dentro para fora.", objectives:[{text:"Examinar o selo com uma personagem capaz de detectar magia.",completed:false},{text:"Encontrar três fragmentos do encantamento original.",completed:false},{text:"Restaurar ou destruir o selo.",completed:false}], rewards:[{type:"xp",label:"+400 XP"},{type:"item",label:"Chave Ritual",image:"./assets/episodios/item-chave.svg"}] },
        { id:"quarto-17", code:"MQ-03", title:"QUARTO 17", state:"BLOQUEADA", description:"Nenhum registro oficial menciona um quarto 17. Ainda assim, uma porta com esse número aparece entre dois dormitórios sempre que a casa fica completamente silenciosa.", objectives:[{text:"Fazer a porta aparecer.",completed:false},{text:"Entrar no quarto sem quebrar o encanto.",completed:false}], rewards:[{type:"xp",label:"+350 XP"},{type:"ability",label:"Eco de Memória"}] }
      ],
      missions: [
        { id:"ervas-de-meia-noite", code:"MS-01", title:"ERVAS DE MEIA-NOITE", state:"DISPONÍVEL", description:"Uma preparação ritual exige ervas que só podem ser colhidas entre meia-noite e a primeira hora da madrugada nos jardins mais antigos do Garden District.", objectives:[{text:"Encontrar três plantas de verbena negra.",completed:false},{text:"Voltar à Academia antes do amanhecer.",completed:false}], rewards:[{type:"xp",label:"+120 XP"},{type:"item",label:"Frasco Ritual",image:"./assets/episodios/item-frasco.svg"}] },
        { id:"favor-no-quarter", code:"MS-02", title:"UM FAVOR NO QUARTER", state:"DISPONÍVEL", description:"Uma comerciante do French Quarter possui informações sobre uma relíquia desaparecida, mas só fala depois que uma antiga dívida for resolvida.", objectives:[{text:"Localizar a comerciante no French Quarter.",completed:false},{text:"Descobrir qual favor ela exige.",completed:false},{text:"Retornar com a informação sobre a relíquia.",completed:false}], rewards:[{type:"xp",label:"+180 XP"},{type:"ability",label:"Contato: Mercado Oculto"}] }
      ]
    },
    { id:"episodio-02", number:"EPISÓDIO II", title:"SANGUE NO BAYOU", status:"BLOQUEADO", progress:"0 / 5", poster:"./assets/episodios/ep02.svg", background:"./assets/episodios/bg-bayou.svg", synopsis:"Um corpo surge no Bayou marcado por símbolos que pertencem a duas tradições mágicas que jamais deveriam ter sido combinadas.", mainQuests:[{id:"corpo-na-agua",code:"MQ-04",title:"O CORPO NA ÁGUA",state:"BLOQUEADA",description:"Uma descoberta no Bayou força o Coven a investigar uma sequência de sinais ritualísticos incompatíveis entre si.",objectives:[{text:"Identificar a vítima.",completed:false},{text:"Coletar amostras dos símbolos ritualísticos.",completed:false},{text:"Descobrir quem esteve no local antes do Coven.",completed:false}],rewards:[{type:"xp",label:"+300 XP"}]}], missions:[] },
    { id:"episodio-03", number:"EPISÓDIO III", title:"A COROA VAZIA", status:"BLOQUEADO", progress:"0 / 6", poster:"./assets/episodios/ep03.svg", background:"./assets/episodios/bg-french.svg", synopsis:"Os sinais de uma nova Suprema deixam de ser rumores quando duas candidatas manifestam a mesma Maravilha na mesma noite.", mainQuests:[{id:"duas-candidatas",code:"MQ-05",title:"DUAS CANDIDATAS",state:"BLOQUEADA",description:"O Coven precisa descobrir por que duas bruxas diferentes manifestaram o mesmo sinal associado à sucessão da Suprema.",objectives:[{text:"Investigar as duas manifestações.",completed:false},{text:"Consultar os registros das Supremas anteriores.",completed:false}],rewards:[{type:"xp",label:"+500 XP"}]}], missions:[] },
    { id:"episodio-04", number:"EPISÓDIO IV", title:"OS NOMES MORTOS", status:"BLOQUEADO", progress:"0 / 7", poster:"./assets/episodios/ep04.svg", background:"./assets/episodios/bg-cemiterio.svg", synopsis:"Nomes desaparecem de lápides antigas ao mesmo tempo em que pessoas esquecidas começam a ser vistas pelas ruas da cidade.", mainQuests:[{id:"lapides-sem-nome",code:"MQ-06",title:"LÁPIDES SEM NOME",state:"BLOQUEADA",description:"Um cemitério inteiro parece estar perdendo a memória dos seus mortos, e cada nome apagado coincide com uma nova aparição em New Orleans.",objectives:[{text:"Catalogar as lápides afetadas.",completed:false},{text:"Identificar a primeira pessoa esquecida.",completed:false}],rewards:[{type:"xp",label:"+650 XP"}]}], missions:[] }
  ]
};
