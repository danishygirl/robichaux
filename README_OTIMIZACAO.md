# COVEN — otimização de desempenho

Esta é a base final otimizada da Home + Personagens.

## O que foi mantido

- identidade visual clean / arquivo ritualístico;
- textura mística e textura de papel;
- cartões em escala de cinza;
- hover dos cartões;
- filtros de categoria;
- dossiê expandido ao clicar;
- nome, idade, classe, nível, poder, história, deck e campos extras;
- edição centralizada em `public/personagens-data.js`;
- estrutura GitHub + Cloudflare Workers Static Assets.

## O que foi otimizado

1. **Filtros sem recriar o grid** — os cartões ficam no DOM e são apenas mostrados/ocultados.
2. **Event delegation** — um único listener atende todos os cartões e outro atende todos os filtros.
3. **Lazy loading** — somente os primeiros retratos recebem prioridade; os demais carregam conforme necessário.
4. **Renderização fora da tela** — `content-visibility` e `contain` reduzem o custo de cartões que ainda não estão visíveis.
5. **Hover mais barato** — mantém zoom/opacidade, mas não anima o filtro de imagem a cada frame.
6. **Dossiê mais leve** — sem `backdrop-filter` em tela cheia.
7. **Textura estática** — o antigo ruído SVG com `feTurbulence` foi substituído por `public/assets/paper-noise.png`.

## Fotos recomendadas

Para personagens, prefira WEBP. Em geral, 900–1200 px de largura é mais do que suficiente para o layout atual. Evite usar diretamente fotos enormes de câmera/celular com vários megabytes.
