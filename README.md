# COVEN — site do RPG

Projeto novo e independente, pronto para ser versionado no GitHub e publicado com Cloudflare Workers Static Assets.

## Estrutura

```text
COVEN_SITE_COMPLETO/
├─ package.json
├─ wrangler.jsonc
├─ README.md
└─ public/
   ├─ index.html                 # Home
   ├─ personagens.html           # Personagens
   ├─ home.css                   # Estilo global + Home
   ├─ personagens.css            # Estilo da página Personagens
   ├─ site-data.js               # Menu global + conteúdo da Home
   ├─ app.js                     # Comportamento da Home
   ├─ personagens-data.js        # TODOS os dados editáveis dos personagens/filtros
   ├─ personagens.js             # Renderização, filtros e dossiê
   └─ assets/
      ├─ mystic-overlay.svg
      ├─ paper-noise.png          # textura estática otimizada
      └─ personagens/
```

## Rodar localmente

Requer Node.js instalado.

```bash
npm install
npm run dev
```

O Wrangler exibirá a URL local do projeto.

## Publicar no Cloudflare

```bash
npm run deploy
```

Você também pode conectar o repositório GitHub ao Cloudflare para deploy automático a cada push.

## Editar o menu

Abra:

```text
public/site-data.js
```

Adicione as novas páginas no array `menu` conforme elas forem criadas.

## Editar personagens

Abra:

```text
public/personagens-data.js
```

Cada objeto dentro de `characters` gera automaticamente:

1. um cartão na página;
2. a foto do personagem;
3. o dossiê expandido ao clicar.

Não existe limite de 3 cartões. Adicione quantos personagens forem necessários.

## Filtros de categoria

Os botões são definidos em `page.filters` dentro de `public/personagens-data.js`.

Exemplo:

```js
filters: [
  { id: "todos", label: "TODOS" },
  { id: "bruxas", label: "BRUXAS" },
  { id: "civis", label: "CIVIS" }
]
```

Depois, em cada personagem:

```js
categoria: "bruxas"
```

Ou mais de uma categoria:

```js
categorias: ["bruxas", "criaturas"]
```

Os números nos botões são calculados automaticamente.

## Fotos

Coloque as imagens em:

```text
public/assets/personagens/
```

E referencie assim:

```js
imagem: "./assets/personagens/nome-do-arquivo.jpg"
```

JPG, PNG, WEBP e SVG funcionam normalmente.

Para manter a página rápida quando houver muitos personagens, prefira **WEBP** para fotografias. Uma boa referência é exportar o retrato com aproximadamente **1200 px de largura** (não é necessário usar fotos de 4000–6000 px no cartão). O site já usa carregamento preguiçoso (`lazy loading`) nas imagens que ficam fora da primeira tela.

## Otimização da página Personagens

Esta versão mantém o mesmo visual e o mesmo dossiê clicável, mas foi preparada para listas maiores:

- os cartões são criados apenas uma vez;
- trocar de categoria apenas mostra/esconde os cartões existentes;
- existe um único evento de clique para todo o grid;
- categorias e contagens são calculadas uma única vez;
- imagens fora da primeira tela usam lazy loading e decodificação assíncrona;
- cartões usam `content-visibility`/`contain` para reduzir trabalho fora da área visível;
- o blur em tempo real do fundo do dossiê foi substituído por um fundo visualmente equivalente e mais leve;
- o ruído fractal calculado pelo navegador foi substituído por `assets/paper-noise.png`, preservando a textura de papel;
- o filtro de cor das fotos continua existindo para manter a estética, mas não é mais recalculado durante a animação de hover.

## Discord

O botão da Home ainda usa um placeholder. Troque o `href` da ação `DISCORD` em `public/site-data.js` pelo convite correto.
