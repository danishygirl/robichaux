(() => {
  "use strict";

  const site = window.COVEN_CONTENT;
  const data = window.COVEN_CHARACTERS;
  if (!site || !data || !Array.isArray(data.characters)) return;

  const nav = document.getElementById("mainNav");
  const grid = document.getElementById("characterGrid");
  const filtersRoot = document.getElementById("characterFilters");
  const filterStatus = document.getElementById("filterStatus");
  const emptyState = document.getElementById("characterEmpty");
  const powerButton = document.getElementById("powerButton");
  const dialog = document.getElementById("characterDialog");
  const closeButton = document.getElementById("dossierClose");

  const els = {
    eyebrow: document.getElementById("charactersEyebrow"),
    title: document.getElementById("charactersTitle"),
    subtitle: document.getElementById("charactersSubtitle"),
    count: document.getElementById("characterCount"),
    image: document.getElementById("dossierImage"),
    imageCode: document.getElementById("dossierImageCode"),
    code: document.getElementById("dossierCode"),
    footerCode: document.getElementById("dossierFooterCode"),
    classTop: document.getElementById("dossierClassTop"),
    name: document.getElementById("dossierName"),
    identity: document.getElementById("identityFields"),
    power: document.getElementById("dossierPower"),
    powerSection: document.getElementById("powerSection"),
    story: document.getElementById("dossierStory"),
    storySection: document.getElementById("storySection"),
    deck: document.getElementById("dossierDeck"),
    deckSection: document.getElementById("deckSection"),
    extras: document.getElementById("dossierExtras")
  };

  const normalizeKey = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const currentPage = document.body.dataset.page || "personagens";

  // Os metadados são calculados uma única vez. Isso evita refazer trabalho
  // toda vez que o jogador troca de filtro.
  const characterRecords = data.characters.map((character, sourceIndex) => {
    const rawCategories = Array.isArray(character.categorias)
      ? character.categorias
      : character.categoria !== undefined
        ? [character.categoria]
        : character.classe
          ? [character.classe]
          : [];

    return {
      character,
      sourceIndex,
      categories: rawCategories.map(normalizeKey).filter(Boolean),
      card: null
    };
  });

  // ---------- MENU GLOBAL ----------
  if (nav && Array.isArray(site.menu)) {
    const fragment = document.createDocumentFragment();

    site.menu.forEach((item) => {
      const link = document.createElement("a");
      link.className = `nav-link${item.id === currentPage ? " is-active" : ""}`;
      link.href = item.href;
      link.textContent = item.label;
      if (item.id === currentPage) link.setAttribute("aria-current", "page");
      fragment.appendChild(link);
    });

    nav.appendChild(fragment);
  }

  // ---------- CABEÇALHO DA PÁGINA ----------
  if (els.eyebrow) els.eyebrow.textContent = data.page?.eyebrow || "";
  if (els.title) els.title.textContent = data.page?.title || "PERSONAGENS";
  if (els.subtitle) els.subtitle.textContent = data.page?.subtitle || "";

  // ---------- DOSSIÊ ----------
  const createField = (label, value, className = "identity-field") => {
    const wrapper = document.createElement("dl");
    wrapper.className = className;

    const dt = document.createElement("dt");
    dt.textContent = label;

    const dd = document.createElement("dd");
    dd.textContent = String(value);

    wrapper.append(dt, dd);
    return wrapper;
  };

  const renderPower = (power) => {
    if (!els.power || !els.powerSection) return;
    els.power.replaceChildren();

    if (power === undefined || power === null || power === "") {
      els.powerSection.hidden = true;
      return;
    }

    els.powerSection.hidden = false;
    const values = Array.isArray(power) ? power : [power];
    const container = document.createElement("div");
    container.className = "power-tags";

    values.forEach((value) => {
      const tag = document.createElement("span");
      tag.className = "power-tag";
      tag.textContent = String(value);
      container.appendChild(tag);
    });

    els.power.appendChild(container);
  };

  const renderDeck = (deck) => {
    if (!els.deck || !els.deckSection) return;
    els.deck.replaceChildren();

    if (!Array.isArray(deck) || deck.length === 0) {
      els.deckSection.hidden = true;
      return;
    }

    els.deckSection.hidden = false;
    const fragment = document.createDocumentFragment();

    deck.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = String(item);
      fragment.appendChild(li);
    });

    els.deck.appendChild(fragment);
  };

  const openDossier = (character) => {
    if (!dialog) return;

    const code = character.codigo || character.id || "FILE";
    const name = character.nome || "SEM NOME";

    if (els.image) {
      els.image.src = character.imagem || "";
      els.image.alt = `Retrato de ${name}`;
      els.image.decoding = "async";
    }

    if (els.imageCode) els.imageCode.textContent = `SUBJECT IMAGE // ${code}`;
    if (els.code) els.code.textContent = code;
    if (els.footerCode) els.footerCode.textContent = code;
    if (els.classTop) els.classTop.textContent = character.classe || "UNCLASSIFIED";
    if (els.name) els.name.textContent = name;

    if (els.identity) {
      const identityFragment = document.createDocumentFragment();

      [
        ["NOME", character.nome],
        ["IDADE", character.idade],
        ["CLASSE", character.classe],
        ["NÍVEL", character.nivel]
      ].forEach(([label, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          identityFragment.appendChild(createField(label, value));
        }
      });

      els.identity.replaceChildren(identityFragment);
    }

    renderPower(character.poder);

    if (els.storySection && els.story) {
      const hasStory = Boolean(character.historia);
      els.storySection.hidden = !hasStory;
      els.story.textContent = hasStory ? String(character.historia) : "";
    }

    renderDeck(character.deck);

    if (els.extras) {
      const extrasFragment = document.createDocumentFragment();

      if (Array.isArray(character.extras)) {
        character.extras.forEach((field) => {
          if (field && field.label && field.value !== undefined && field.value !== "") {
            extrasFragment.appendChild(createField(field.label, field.value, "extra-field"));
          }
        });
      }

      els.extras.replaceChildren(extrasFragment);
    }

    if (!dialog.open) dialog.showModal();
    closeButton?.focus({ preventScroll: true });
  };

  // ---------- CARTÕES ----------
  const buildCard = (character, sourceIndex) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "character-card";
    card.dataset.characterIndex = String(sourceIndex);
    card.dataset.characterId = character.id || `character-${sourceIndex + 1}`;
    card.setAttribute(
      "aria-label",
      `Abrir dossiê de ${character.nome || `personagem ${sourceIndex + 1}`}`
    );

    const img = document.createElement("img");
    img.className = "character-portrait";
    img.src = character.imagem || "";
    img.alt = "";
    img.decoding = "async";
    img.draggable = false;

    // Só os primeiros cartões são carregados imediatamente; os demais ficam
    // sob lazy-loading nativo do navegador para economizar memória e rede.
    if (sourceIndex < 3) {
      img.loading = "eager";
      img.fetchPriority = "high";
    } else {
      img.loading = "lazy";
      img.fetchPriority = "low";
    }

    img.addEventListener(
      "error",
      () => {
        img.hidden = true;
        card.classList.add("has-missing-image");
      },
      { once: true }
    );

    const shade = document.createElement("span");
    shade.className = "character-card-shade";
    shade.setAttribute("aria-hidden", "true");

    const idx = document.createElement("span");
    idx.className = "card-index";
    idx.textContent = String(sourceIndex + 1).padStart(2, "0");

    const code = document.createElement("span");
    code.className = "card-code";
    code.textContent = character.codigo || character.id || "FILE";

    const copy = document.createElement("div");
    copy.className = "card-copy";

    const className = document.createElement("span");
    className.className = "card-class";
    className.textContent = character.classe || "ARQUIVO";

    const name = document.createElement("h2");
    name.className = "card-name";
    name.textContent = character.nome || "SEM NOME";

    const open = document.createElement("div");
    open.className = "card-open";

    const openText = document.createElement("span");
    openText.textContent = "OPEN DOSSIER";

    const openIcon = document.createElement("span");
    openIcon.setAttribute("aria-hidden", "true");
    openIcon.textContent = "↗";

    open.append(openText, openIcon);
    copy.append(className, name, open);
    card.append(img, shade, idx, code, copy);
    return card;
  };

  const renderCardsOnce = () => {
    if (!grid) return;

    const fragment = document.createDocumentFragment();
    characterRecords.forEach((record) => {
      record.card = buildCard(record.character, record.sourceIndex);
      fragment.appendChild(record.card);
    });

    // A partir daqui os cartões permanecem no DOM. Os filtros apenas alternam
    // o atributo hidden; nada é destruído/recriado ao navegar nas categorias.
    grid.replaceChildren(fragment);
  };

  // ---------- FILTROS ----------
  const configuredFilters = Array.isArray(data.page?.filters) && data.page.filters.length
    ? data.page.filters
    : [
        { id: "todos", label: "TODOS" },
        ...Array.from(new Set(characterRecords.flatMap((record) => record.categories))).map(
          (id) => ({ id, label: id.toUpperCase() })
        )
      ];

  const filters = configuredFilters.map((filter, index) => ({
    id: normalizeKey(filter.id || filter.label || `filter-${index + 1}`),
    label: String(filter.label || filter.id || `FILTRO ${index + 1}`)
  }));

  if (!filters.some((filter) => filter.id === "todos")) {
    filters.unshift({ id: "todos", label: "TODOS" });
  }

  const categoryCounts = new Map();
  categoryCounts.set("todos", characterRecords.length);

  characterRecords.forEach((record) => {
    new Set(record.categories).forEach((category) => {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });
  });

  let activeFilter = "todos";
  let filterFrame = 0;

  const getFilterCount = (filterId) =>
    filterId === "todos" ? characterRecords.length : categoryCounts.get(filterId) || 0;

  const updateFilterButtons = () => {
    if (!filtersRoot) return;

    filtersRoot.querySelectorAll(".filter-button").forEach((button) => {
      const isActive = button.dataset.filter === activeFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const applyFilter = () => {
    let visible = 0;

    characterRecords.forEach((record) => {
      const show = activeFilter === "todos" || record.categories.includes(activeFilter);
      if (record.card) {
        record.card.hidden = !show;
        record.card.setAttribute("aria-hidden", String(!show));
      }
      if (show) visible += 1;
    });

    const total = characterRecords.length;
    if (els.count) {
      els.count.textContent = activeFilter === "todos"
        ? `${String(total).padStart(2, "0")} RECORDS`
        : `${String(visible).padStart(2, "0")} / ${String(total).padStart(2, "0")} RECORDS`;
    }

    if (filterStatus) {
      const activeLabel = filters.find((filter) => filter.id === activeFilter)?.label || "TODOS";
      filterStatus.textContent = `${activeLabel} // ${String(visible).padStart(2, "0")}`;
    }

    if (emptyState) emptyState.hidden = visible !== 0;
  };

  const setFilter = (filterId, { focus = false } = {}) => {
    const exists = filters.some((filter) => filter.id === filterId);
    activeFilter = exists ? filterId : "todos";
    updateFilterButtons();

    // Agrupa as alterações visuais no próximo frame para evitar layout thrashing.
    window.cancelAnimationFrame(filterFrame);
    filterFrame = window.requestAnimationFrame(() => {
      applyFilter();

      if (focus && filtersRoot) {
        filtersRoot.querySelector(`[data-filter="${activeFilter}"]`)?.focus();
      }
    });
  };

  const renderFilters = () => {
    if (!filtersRoot) return;

    const fragment = document.createDocumentFragment();

    filters.forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.dataset.filter = filter.id;
      button.setAttribute("aria-pressed", "false");

      const label = document.createElement("span");
      label.className = "filter-label";
      label.textContent = filter.label;

      const count = document.createElement("span");
      count.className = "filter-count";
      count.textContent = String(getFilterCount(filter.id)).padStart(2, "0");

      button.append(label, count);
      fragment.appendChild(button);
    });

    filtersRoot.replaceChildren(fragment);
    updateFilterButtons();
  };

  renderCardsOnce();
  renderFilters();
  applyFilter();

  // ---------- EVENTOS GERAIS ----------
  // Um único listener atende todos os cartões, inclusive quando houver dezenas deles.
  grid?.addEventListener("click", (event) => {
    const card = event.target.closest(".character-card");
    if (!card || !grid.contains(card) || card.hidden) return;

    const index = Number.parseInt(card.dataset.characterIndex || "", 10);
    const character = data.characters[index];
    if (character) openDossier(character);
  });

  filtersRoot?.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-button");
    if (!button || !filtersRoot.contains(button)) return;
    setFilter(button.dataset.filter || "todos");
  });

  closeButton?.addEventListener("click", () => dialog?.close());

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  powerButton?.addEventListener("click", () => {
    document.body.classList.toggle("effects-off");
    powerButton.classList.toggle("is-off");
  });
})();
