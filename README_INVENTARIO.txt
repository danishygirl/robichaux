COVEN — INVENTÁRIO 100% EDITÁVEL

ARQUIVOS DA PÁGINA
- public/inventario.html
- public/inventario.css
- public/inventario.js
- public/inventario-data.js
- public/assets/inventario/

ARQUIVO PRINCIPAL PARA EDITAR
public/inventario-data.js

IMAGENS
Os SVGs incluídos são apenas placeholders.
Você pode usar imagens reais JPG, PNG ou WebP.
Exemplo:
  image: "./assets/inventario/minha-adaga.webp"

CABEÇALHO
O bloco "player" é totalmente opcional.
Você pode:
- apagar player inteiro;
- apagar name;
- apagar levelLabel;
- apagar level;
- apagar xpProgress;
- apagar uma linha de stats;
- deixar stats vazio;
- adicionar novas linhas de stats.

Quando uma informação é apagada, o layout se reorganiza automaticamente.

ITENS
Em cada item, também são opcionais:
- code
- name
- category
- rarity
- status
- stock
- xpCost
- image
- summary
- description
- use
- attributes
- tags

Se uma seção não tiver informação, ela desaparece automaticamente na carta e/ou ficha.

ATRIBUTOS
Você pode criar qualquer atributo que quiser:
  attributes: [
    { label: "ATAQUE", value: "+4" },
    { label: "DEFESA", value: "+1" },
    { label: "CARGAS", value: "3" },
    { label: "EFEITO", value: "Paralisia" }
  ]

INTERFACE
Em page você pode editar ou apagar:
- eyebrow
- title
- previewLabel
- openLabel
- modalTitle
- modalHeader
- filters

A página foi preparada para continuar funcionando mesmo com esses campos removidos.
