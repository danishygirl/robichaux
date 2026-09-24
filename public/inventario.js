(() => {
  "use strict";

  const site = window.COVEN_CONTENT;
  const data = window.COVEN_INVENTARIO;
  if (!site || !data || !Array.isArray(data.items)) return;

  const currentPage = document.body.dataset.page || "inventario";
  const nav = document.getElementById("mainNav");
  const powerButton = document.getElementById("powerButton");
  const filtersRoot = document.getElementById("catalogFilters");
  const grid = document.getElementById("inventoryGrid");
  const emptyState = document.getElementById("catalogEmpty");
  const dialog = document.getElementById("itemDialog");
  const closeButton = document.getElementById("itemClose");
  const selectedCard = document.getElementById("selectedCard");

  const selectedEls = {
    status: document.getElementById("selectedStatus"),
    counter: document.getElementById("selectedCounter"),
    rarity: document.getElementById("selectedRarity"),
    image: document.getElementById("selectedImage"),
    category: document.getElementById("selectedCategory"),
    name: document.getElementById("selectedName"),
    summary: document.getElementById("selectedSummary"),
    xpCost: document.getElementById("selectedXpCost"),
    miniStats: document.getElementById("selectedMiniStats")
  };

  const modalEls = {
    code: document.getElementById("itemModalCode"),
    family: document.getElementById("itemModalFamily"),
    image: document.getElementById("itemModalImage"),
    identity: document.getElementById("itemModalIdentity"),
    category: document.getElementById("itemModalCategory"),
    name: document.getElementById("itemModalName"),
    summary: document.getElementById("itemModalSummary"),
    description: document.getElementById("itemModalDescription"),
    useSection: document.getElementById("itemModalUseSection"),
    use: document.getElementById("itemModalUse"),
    attributes: document.getElementById("itemModalAttributes"),
    tagsSection: document.getElementById("itemModalTagsSection"),
    tags: document.getElementById("itemModalTags")
  };

  const pageEls = {
    eyebrow: document.getElementById("inventoryEyebrow"),
    title: document.getElementById("inventoryTitle"),
    playerName: document.getElementById("playerName"),
    playerLevel: document.getElementById("playerLevel"),
    playerXpProgress: document.getElementById("playerXpProgress"),
    playerStatsList: document.getElementById("playerStatsList"),
    activeLabel: document.getElementById("catalogActiveLabel"),
    count: document.getElementById("catalogCount")
  };

  const normalizeKey = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const createField = (label, value, className = "info-field") => {
    const wrapper = document.createElement("dl");
    wrapper.className = className;
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = String(value);
    wrapper.append(dt, dd);
    return wrapper;
  };

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

  if (powerButton) {
    powerButton.addEventListener("click", () => {
      document.body.classList.toggle("effects-off");
      powerButton.classList.toggle("is-off");
    });
  }

  if (pageEls.eyebrow) pageEls.eyebrow.textContent = data.page?.eyebrow || "";
  if (pageEls.title) pageEls.title.textContent = data.page?.title || "INVENTÁRIO";
  if (pageEls.playerName) pageEls.playerName.textContent = data.player?.name || "ROBICHAUX MARKET";
  if (pageEls.playerLevel) pageEls.playerLevel.textContent = data.player?.level || "--";
  if (pageEls.playerXpProgress) pageEls.playerXpProgress.textContent = data.player?.xpProgress || "";

  if (pageEls.playerStatsList) {
    const fragment = document.createDocumentFragment();
    (data.player?.stats || []).forEach((entry) => {
      if (!entry?.label || entry.value === undefined) return;
      fragment.appendChild(createField(entry.label, entry.value, "player-stat"));
    });
    pageEls.playerStatsList.replaceChildren(fragment);
  }

  const records = data.items.map((item, sourceIndex) => {
    const rawCategories = Array.isArray(item.categories)
      ? item.categories
      : item.category !== undefined
        ? [item.category]
        : [];

    return {
      item,
      sourceIndex,
      categories: rawCategories.map(normalizeKey).filter(Boolean),
      card: null
    };
  });

  const filters = (Array.isArray(data.page?.filters) ? data.page.filters : []).map((filter, index) => ({
    id: normalizeKey(filter.id || filter.label || `filter-${index + 1}`),
    label: String(filter.label || filter.id || `FILTRO ${index + 1}`)
  }));

  if (!filters.some((filter) => filter.id === "todos")) {
    filters.unshift({ id: "todos", label: "TODOS" });
  }

  let activeFilterId = filters[0]?.id || "todos";
  let selectedIndex = 0;
  const filterButtons = new Map();

  const visibleRecords = () => records.filter((record) => activeFilterId === "todos" || record.categories.includes(activeFilterId));

  const buildItemCard = (item, sourceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `inventory-item-card${item.locked ? " is-locked" : ""}`;
    button.dataset.itemIndex = String(sourceIndex);
    button.setAttribute("aria-label", `Selecionar item ${item.name || `item ${sourceIndex + 1}`}`);

    const image = document.createElement("img");
    image.className = "inventory-item-thumb";
    image.src = item.image || "";
    image.alt = item.name || "Item";
    image.loading = sourceIndex < 4 ? "eager" : "lazy";
    image.decoding = "async";

    const name = document.createElement("span");
    name.className = "inventory-item-name";
    name.textContent = item.name || "ITEM";

    const badge = document.createElement("span");
    badge.className = "inventory-item-badge";
    badge.textContent = item.locked ? "LOCK" : (item.xpCost || "XP");

    button.append(image, name, badge);
    return button;
  };

  const renderGridOnce = () => {
    const fragment = document.createDocumentFragment();
    records.forEach((record) => {
      record.card = buildItemCard(record.item, record.sourceIndex);
      fragment.appendChild(record.card);
    });
    grid.replaceChildren(fragment);
  };

  const syncSelectionStyles = () => {
    records.forEach((record, index) => {
      record.card?.classList.toggle("is-selected", index === selectedIndex);
    });
  };

  const fillSelectedCard = (item) => {
    selectedEls.status.textContent = item.status || "DISPONÍVEL";
    selectedEls.counter.textContent = item.stock || "ITEM";
    selectedEls.rarity.textContent = item.rarity || "ITEM";
    selectedEls.image.src = item.image || "";
    selectedEls.image.alt = item.name || "Item";
    selectedEls.category.textContent = item.category || "INVENTÁRIO";
    selectedEls.name.textContent = item.name || "ITEM";
    selectedEls.summary.textContent = item.summary || "";
    selectedEls.xpCost.textContent = item.xpCost ? `CUSTO ${item.xpCost}` : "CUSTO —";

    const frag = document.createDocumentFragment();
    (item.attributes || []).slice(0, 4).forEach((attr) => {
      if (!attr?.label || attr.value === undefined) return;
      frag.appendChild(createField(attr.label, attr.value, "mini-stat"));
    });
    selectedEls.miniStats.replaceChildren(frag);
  };

  const openModal = (item) => {
    modalEls.code.textContent = item.code || item.id || "ITEM";
    modalEls.family.textContent = item.category || "INVENTÁRIO";
    modalEls.image.src = item.image || "";
    modalEls.image.alt = item.name || "Item";
    modalEls.category.textContent = item.category || "INVENTÁRIO";
    modalEls.name.textContent = item.name || "ITEM";
    modalEls.summary.textContent = item.summary || "";
    modalEls.description.textContent = item.description || "";

    const identityFrag = document.createDocumentFragment();
    [
      ["CÓDIGO", item.code],
      ["RARIDADE", item.rarity],
      ["STATUS", item.status],
      ["ESTOQUE", item.stock],
      ["CUSTO", item.xpCost]
    ].forEach(([label, value]) => {
      if (value !== undefined && value !== null && value !== "") identityFrag.appendChild(createField(label, value));
    });
    modalEls.identity.replaceChildren(identityFrag);

    const hasUse = Boolean(item.use);
    modalEls.useSection.hidden = !hasUse;
    modalEls.use.textContent = hasUse ? String(item.use) : "";

    const attributesFrag = document.createDocumentFragment();
    (item.attributes || []).forEach((attr) => {
      if (!attr?.label || attr.value === undefined) return;
      attributesFrag.appendChild(createField(attr.label, attr.value, "attribute-field"));
    });
    modalEls.attributes.replaceChildren(attributesFrag);

    if (Array.isArray(item.tags) && item.tags.length) {
      modalEls.tagsSection.hidden = false;
      const tagsFrag = document.createDocumentFragment();
      item.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "modal-tag";
        chip.textContent = String(tag);
        tagsFrag.appendChild(chip);
      });
      modalEls.tags.replaceChildren(tagsFrag);
    } else {
      modalEls.tagsSection.hidden = true;
      modalEls.tags.replaceChildren();
    }

    if (!dialog.open) dialog.showModal();
    closeButton?.focus({ preventScroll: true });
  };

  const updateCatalogMeta = (visible) => {
    const current = filters.find((filter) => filter.id === activeFilterId);
    pageEls.activeLabel.textContent = current?.label || "TODOS";
    pageEls.count.textContent = `${visible.toString().padStart(2, "0")} ITENS`;
  };

  const applyFilter = (filterId) => {
    activeFilterId = filterId;
    let visible = 0;
    records.forEach((record) => {
      const isVisible = filterId === "todos" || record.categories.includes(filterId);
      if (record.card) record.card.hidden = !isVisible;
      if (isVisible) visible += 1;
    });

    const currentVisible = visibleRecords();
    if (!currentVisible.some((record) => record.sourceIndex === selectedIndex)) {
      selectedIndex = currentVisible[0]?.sourceIndex ?? 0;
    }

    filterButtons.forEach((button, id) => {
      const active = id === filterId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    emptyState.hidden = visible !== 0;
    syncSelectionStyles();
    updateCatalogMeta(visible);
    const selected = records[selectedIndex];
    if (selected) fillSelectedCard(selected.item);
  };

  const renderFilters = () => {
    const fragment = document.createDocumentFragment();
    const countForFilter = (filterId) => filterId === "todos" ? records.length : records.filter((record) => record.categories.includes(filterId)).length;

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
  };

  selectedCard?.addEventListener("click", () => {
    const selected = records[selectedIndex];
    if (selected) openModal(selected.item);
  });

  grid?.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(".inventory-item-card") : null;
    if (!button) return;
    const index = Number(button.dataset.itemIndex);
    if (!Number.isInteger(index)) return;
    selectedIndex = index;
    syncSelectionStyles();
    fillSelectedCard(records[index].item);
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
  fillSelectedCard(records[selectedIndex]?.item || data.items[0]);
  syncSelectionStyles();
  applyFilter(activeFilterId);
})();
