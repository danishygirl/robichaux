(() => {
  "use strict";

  const site = window.COVEN_CONTENT;
  const data = window.COVEN_INVENTARIO;
  if (!site || !data) return;

  const items = Array.isArray(data.items) ? data.items : [];
  const currentPage = document.body.dataset.page || "inventario";

  const nav = document.getElementById("mainNav");
  const filtersRoot = document.getElementById("catalogFilters");
  const grid = document.getElementById("inventoryGrid");
  const emptyState = document.getElementById("catalogEmpty");
  const previewPanel = document.getElementById("inventoryPreviewPanel");
  const dialog = document.getElementById("itemDialog");
  const closeButton = document.getElementById("itemClose");
  const selectedCard = document.getElementById("selectedCard");

  const pageEls = {
    eyebrow: document.getElementById("inventoryEyebrow"),
    title: document.getElementById("inventoryTitle"),
    playerPanel: document.getElementById("playerPanel"),
    playerMeta: document.getElementById("playerMeta"),
    playerName: document.getElementById("playerName"),
    playerLevelBadge: document.getElementById("playerLevelBadge"),
    playerLevelLabel: document.getElementById("playerLevelLabel"),
    playerLevel: document.getElementById("playerLevel"),
    playerXpProgress: document.getElementById("playerXpProgress"),
    playerStatsList: document.getElementById("playerStatsList"),
    activeLabel: document.getElementById("catalogActiveLabel"),
    count: document.getElementById("catalogCount"),
    previewEyebrow: document.getElementById("previewEyebrow"),
    selectedOpenLabel: document.getElementById("selectedOpenLabel")
  };

  const selectedEls = {
    status: document.getElementById("selectedStatus"),
    counter: document.getElementById("selectedCounter"),
    rarity: document.getElementById("selectedRarity"),
    imageWrap: document.getElementById("selectedImageWrap"),
    image: document.getElementById("selectedImage"),
    copy: document.getElementById("selectedCopy"),
    category: document.getElementById("selectedCategory"),
    name: document.getElementById("selectedName"),
    summary: document.getElementById("selectedSummary"),
    xpCost: document.getElementById("selectedXpCost"),
    miniStats: document.getElementById("selectedMiniStats")
  };

  const modalEls = {
    headerLine1: document.getElementById("sheetHeaderLine1"),
    headerLine2: document.getElementById("sheetHeaderLine2"),
    headerLine3: document.getElementById("sheetHeaderLine3"),
    titleLabel: document.getElementById("sheetTitleLabel"),
    code: document.getElementById("itemModalCode"),
    family: document.getElementById("itemModalFamily"),
    media: document.getElementById("itemSheetMedia"),
    imageFrame: document.getElementById("itemModalImageFrame"),
    image: document.getElementById("itemModalImage"),
    identity: document.getElementById("itemModalIdentity"),
    category: document.getElementById("itemModalCategory"),
    name: document.getElementById("itemModalName"),
    summary: document.getElementById("itemModalSummary"),
    descriptionSection: document.getElementById("itemModalDescriptionSection"),
    description: document.getElementById("itemModalDescription"),
    useSection: document.getElementById("itemModalUseSection"),
    use: document.getElementById("itemModalUse"),
    attributesSection: document.getElementById("itemModalAttributesSection"),
    attributes: document.getElementById("itemModalAttributes"),
    tagsSection: document.getElementById("itemModalTagsSection"),
    tags: document.getElementById("itemModalTags")
  };

  const normalizeKey = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== "";

  const setOptionalText = (el, value) => {
    if (!el) return false;
    const visible = hasValue(value);
    el.hidden = !visible;
    el.textContent = visible ? String(value) : "";
    return visible;
  };

  const createField = (label, value, className = "info-field") => {
    const wrapper = document.createElement("dl");
    wrapper.className = className;

    const dt = document.createElement("dt");
    dt.textContent = String(label);

    const dd = document.createElement("dd");
    dd.textContent = String(value);

    wrapper.append(dt, dd);
    return wrapper;
  };

  // ---------- MENU ----------
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
// ---------- TEXTOS DA PÁGINA ----------
  setOptionalText(pageEls.eyebrow, data.page?.eyebrow);
  setOptionalText(pageEls.title, data.page?.title);
  setOptionalText(pageEls.previewEyebrow, data.page?.previewLabel);
  setOptionalText(pageEls.selectedOpenLabel, data.page?.openLabel);

  setOptionalText(modalEls.headerLine1, data.page?.modalHeader?.line1);
  setOptionalText(modalEls.headerLine2, data.page?.modalHeader?.line2);
  setOptionalText(modalEls.headerLine3, data.page?.modalHeader?.line3);
  setOptionalText(modalEls.titleLabel, data.page?.modalTitle);

  // ---------- PAINEL DO JOGADOR / LOJA: 100% OPCIONAL ----------
  const renderPlayerPanel = () => {
    const player = data.player;
    if (!pageEls.playerPanel) return;

    if (!player || typeof player !== "object") {
      pageEls.playerPanel.hidden = true;
      return;
    }

    const stats = Array.isArray(player.stats)
      ? player.stats.filter((entry) => entry && hasValue(entry.label) && hasValue(entry.value))
      : [];

    const hasName = setOptionalText(pageEls.playerName, player.name);

    if (pageEls.playerStatsList) {
      const fragment = document.createDocumentFragment();
      stats.forEach((entry) => fragment.appendChild(createField(entry.label, entry.value, "player-stat")));
      pageEls.playerStatsList.replaceChildren(fragment);
      pageEls.playerStatsList.hidden = stats.length === 0;
    }

    const hasMeta = hasName || stats.length > 0;
    if (pageEls.playerMeta) pageEls.playerMeta.hidden = !hasMeta;

    setOptionalText(pageEls.playerLevelLabel, player.levelLabel);
    const hasLevel = setOptionalText(pageEls.playerLevel, player.level);
    const hasXpProgress = setOptionalText(pageEls.playerXpProgress, player.xpProgress);
    const hasLevelBlock = hasLevel || hasXpProgress;
    if (pageEls.playerLevelBadge) pageEls.playerLevelBadge.hidden = !hasLevelBlock;

    pageEls.playerPanel.hidden = !(hasMeta || hasLevelBlock);
    pageEls.playerPanel.classList.toggle("has-single-block", hasMeta !== hasLevelBlock);
  };

  renderPlayerPanel();

  // ---------- REGISTROS ----------
  const records = items.map((item, sourceIndex) => {
    const rawCategories = Array.isArray(item.categories)
      ? item.categories
      : hasValue(item.category)
        ? [item.category]
        : [];

    return {
      item,
      sourceIndex,
      categories: rawCategories.map(normalizeKey).filter(Boolean),
      card: null
    };
  });

  const configuredFilters = Array.isArray(data.page?.filters) && data.page.filters.length
    ? data.page.filters
    : [
        { id: "todos", label: "TODOS" },
        ...Array.from(new Set(records.flatMap((record) => record.categories))).map((id) => ({ id, label: id.toUpperCase() }))
      ];

  const filters = configuredFilters.map((filter, index) => ({
    id: normalizeKey(filter.id || filter.label || `filter-${index + 1}`),
    label: String(filter.label || filter.id || `FILTRO ${index + 1}`)
  }));

  if (!filters.some((filter) => filter.id === "todos")) {
    filters.unshift({ id: "todos", label: "TODOS" });
  }

  let activeFilterId = filters[0]?.id || "todos";
  let selectedIndex = records[0]?.sourceIndex ?? -1;
  const filterButtons = new Map();

  const buildItemCard = (item, sourceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `inventory-item-card${item.locked ? " is-locked" : ""}`;
    button.dataset.itemIndex = String(sourceIndex);
    button.setAttribute("aria-label", `Selecionar ${item.name || `item ${sourceIndex + 1}`}`);

    if (hasValue(item.image)) {
      const image = document.createElement("img");
      image.className = "inventory-item-thumb";
      image.src = item.image;
      image.alt = item.name || "Item";
      image.loading = sourceIndex < 4 ? "eager" : "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => { image.hidden = true; }, { once: true });
      button.appendChild(image);
    }

    if (hasValue(item.name)) {
      const name = document.createElement("span");
      name.className = "inventory-item-name";
      name.textContent = item.name;
      button.appendChild(name);
    }

    const badgeValue = item.locked ? (item.lockedLabel || "LOCK") : item.xpCost;
    if (hasValue(badgeValue)) {
      const badge = document.createElement("span");
      badge.className = "inventory-item-badge";
      badge.textContent = badgeValue;
      button.appendChild(badge);
    }

    return button;
  };

  const renderGridOnce = () => {
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    records.forEach((record) => {
      record.card = buildItemCard(record.item, record.sourceIndex);
      fragment.appendChild(record.card);
    });
    grid.replaceChildren(fragment);
  };

  const getVisibleRecords = () => records.filter((record) => activeFilterId === "todos" || record.categories.includes(activeFilterId));

  const syncSelectionStyles = () => {
    records.forEach((record) => record.card?.classList.toggle("is-selected", record.sourceIndex === selectedIndex));
  };

  // ---------- CARTA DE PRÉVIA: CADA CAMPO É OPCIONAL ----------
  const fillSelectedCard = (item) => {
    if (!item || !selectedCard) {
      if (previewPanel) previewPanel.hidden = true;
      return;
    }

    if (previewPanel) previewPanel.hidden = false;

    setOptionalText(selectedEls.status, item.status);
    setOptionalText(selectedEls.counter, item.stock);
    setOptionalText(selectedEls.rarity, item.rarity);
    setOptionalText(selectedEls.category, item.category);
    setOptionalText(selectedEls.name, item.name);
    setOptionalText(selectedEls.summary, item.summary);
    setOptionalText(selectedEls.xpCost, hasValue(item.xpCost) ? `${item.costLabel || "CUSTO"} ${item.xpCost}` : "");

    const hasImage = hasValue(item.image);
    selectedCard.classList.toggle("without-image", !hasImage);
    if (selectedEls.imageWrap) selectedEls.imageWrap.hidden = !hasImage;
    if (selectedEls.image) {
      selectedEls.image.hidden = !hasImage;
      selectedEls.image.src = hasImage ? item.image : "";
      selectedEls.image.alt = hasImage ? (item.name || "Item") : "";
    }

    const hasCopy = [item.category, item.name, item.summary].some(hasValue);
    selectedCard.classList.toggle("without-copy", !hasCopy);
    if (selectedEls.copy) selectedEls.copy.hidden = !hasCopy;

    if (selectedEls.miniStats) {
      const validAttributes = Array.isArray(item.attributes)
        ? item.attributes.filter((attr) => attr && hasValue(attr.label) && hasValue(attr.value))
        : [];
      const fragment = document.createDocumentFragment();
      validAttributes.slice(0, 4).forEach((attr) => fragment.appendChild(createField(attr.label, attr.value, "mini-stat")));
      selectedEls.miniStats.replaceChildren(fragment);
      selectedEls.miniStats.hidden = validAttributes.length === 0;
    }

    const actionsRow = selectedEls.xpCost?.closest(".selected-actions-row");
    if (actionsRow) {
      const openVisible = pageEls.selectedOpenLabel && !pageEls.selectedOpenLabel.hidden;
      const costVisible = selectedEls.xpCost && !selectedEls.xpCost.hidden;
      actionsRow.hidden = !(openVisible || costVisible);
    }
  };

  // ---------- MODAL: TODAS AS SEÇÕES OPCIONAIS ----------
  const openModal = (item) => {
    if (!dialog || !item) return;

    setOptionalText(modalEls.code, item.code);
    setOptionalText(modalEls.family, item.category);
    setOptionalText(modalEls.category, item.category);
    setOptionalText(modalEls.name, item.name);
    setOptionalText(modalEls.summary, item.summary);

    const hasImage = hasValue(item.image);
    if (modalEls.imageFrame) modalEls.imageFrame.hidden = !hasImage;
    if (modalEls.image) {
      modalEls.image.hidden = !hasImage;
      modalEls.image.src = hasImage ? item.image : "";
      modalEls.image.alt = hasImage ? (item.name || "Item") : "";
    }

    const identityPairs = [
      [item.codeLabel || "CÓDIGO", item.code],
      [item.rarityLabel || "RARIDADE", item.rarity],
      [item.statusLabel || "STATUS", item.status],
      [item.stockLabel || "ESTOQUE", item.stock],
      [item.costLabel || "CUSTO", item.xpCost]
    ].filter(([, value]) => hasValue(value));

    if (modalEls.identity) {
      const fragment = document.createDocumentFragment();
      identityPairs.forEach(([label, value]) => fragment.appendChild(createField(label, value)));
      modalEls.identity.replaceChildren(fragment);
      modalEls.identity.hidden = identityPairs.length === 0;
    }

    if (modalEls.media) modalEls.media.hidden = !hasImage && identityPairs.length === 0;
    dialog.querySelector(".item-sheet-layout")?.classList.toggle("without-media", !hasImage && identityPairs.length === 0);

    const hasDescription = setOptionalText(modalEls.description, item.description);
    if (modalEls.descriptionSection) modalEls.descriptionSection.hidden = !hasDescription;

    const hasUse = setOptionalText(modalEls.use, item.use);
    if (modalEls.useSection) modalEls.useSection.hidden = !hasUse;

    const validAttributes = Array.isArray(item.attributes)
      ? item.attributes.filter((attr) => attr && hasValue(attr.label) && hasValue(attr.value))
      : [];
    if (modalEls.attributes) {
      const fragment = document.createDocumentFragment();
      validAttributes.forEach((attr) => fragment.appendChild(createField(attr.label, attr.value, "attribute-field")));
      modalEls.attributes.replaceChildren(fragment);
    }
    if (modalEls.attributesSection) modalEls.attributesSection.hidden = validAttributes.length === 0;

    const validTags = Array.isArray(item.tags) ? item.tags.filter(hasValue) : [];
    if (modalEls.tags) {
      const fragment = document.createDocumentFragment();
      validTags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "modal-tag";
        chip.textContent = String(tag);
        fragment.appendChild(chip);
      });
      modalEls.tags.replaceChildren(fragment);
    }
    if (modalEls.tagsSection) modalEls.tagsSection.hidden = validTags.length === 0;

    if (!dialog.open) dialog.showModal();
    closeButton?.focus({ preventScroll: true });
  };

  const updateCatalogMeta = (visibleCount) => {
    const current = filters.find((filter) => filter.id === activeFilterId);
    setOptionalText(pageEls.activeLabel, current?.label);
    setOptionalText(pageEls.count, `${visibleCount.toString().padStart(2, "0")} ${visibleCount === 1 ? "ITEM" : "ITENS"}`);
  };

  const applyFilter = (filterId) => {
    activeFilterId = filterId;
    let visibleCount = 0;

    records.forEach((record) => {
      const visible = filterId === "todos" || record.categories.includes(filterId);
      if (record.card) record.card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    const currentVisible = getVisibleRecords();
    if (!currentVisible.some((record) => record.sourceIndex === selectedIndex)) {
      selectedIndex = currentVisible[0]?.sourceIndex ?? -1;
    }

    filterButtons.forEach((button, id) => {
      const active = id === filterId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
    updateCatalogMeta(visibleCount);
    syncSelectionStyles();

    const selectedRecord = records.find((record) => record.sourceIndex === selectedIndex);
    fillSelectedCard(selectedRecord?.item);
  };

  const renderFilters = () => {
    if (!filtersRoot) return;
    const fragment = document.createDocumentFragment();
    const countForFilter = (filterId) => filterId === "todos"
      ? records.length
      : records.filter((record) => record.categories.includes(filterId)).length;

    filters.forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.dataset.filterId = filter.id;
      button.setAttribute("aria-pressed", String(filter.id === activeFilterId));

      const label = document.createElement("span");
      label.textContent = filter.label;
      const count = document.createElement("span");
      count.className = "filter-count";
      count.textContent = String(countForFilter(filter.id)).padStart(2, "0");
      button.append(label, count);

      button.addEventListener("click", () => applyFilter(filter.id));
      filterButtons.set(filter.id, button);
      fragment.appendChild(button);
    });

    filtersRoot.replaceChildren(fragment);
    filtersRoot.hidden = filters.length === 0;
  };

  selectedCard?.addEventListener("click", () => {
    const selected = records.find((record) => record.sourceIndex === selectedIndex);
    if (selected) openModal(selected.item);
  });

  grid?.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(".inventory-item-card") : null;
    if (!button) return;

    const index = Number(button.dataset.itemIndex);
    if (!Number.isInteger(index)) return;
    const record = records.find((entry) => entry.sourceIndex === index);
    if (!record) return;

    selectedIndex = record.sourceIndex;
    syncSelectionStyles();
    fillSelectedCard(record.item);
  });

  closeButton?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside = rect.top <= event.clientY && event.clientY <= rect.bottom && rect.left <= event.clientX && event.clientX <= rect.right;
    if (!inside) dialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog?.open) dialog.close();
  });

  renderGridOnce();
  renderFilters();

  if (records.length === 0) {
    if (previewPanel) previewPanel.hidden = true;
    if (emptyState) emptyState.hidden = false;
    updateCatalogMeta(0);
  } else {
    applyFilter(activeFilterId);
  }
})();
