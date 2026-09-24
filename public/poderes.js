(() => {
  "use strict";

  const site = window.COVEN_CONTENT;
  const data = window.COVEN_POWERS;
  if (!site || !data || !Array.isArray(data.powers)) return;

  const currentPage = document.body.dataset.page || "poderes";
  const nav = document.getElementById("mainNav");
  const powerButton = document.getElementById("powerButton");
  const grid = document.getElementById("powerGrid");
  const filtersRoot = document.getElementById("powerFilters");
  const filterStatus = document.getElementById("filterStatus");
  const emptyState = document.getElementById("powerEmpty");
  const dialog = document.getElementById("powerDialog");
  const closeButton = document.getElementById("sheetClose");

  const els = {
    eyebrow: document.getElementById("powersEyebrow"),
    title: document.getElementById("powersTitle"),
    subtitle: document.getElementById("powersSubtitle"),
    count: document.getElementById("powerCount"),
    code: document.getElementById("abilityCode"),
    footerCode: document.getElementById("abilityFooterCode"),
    familyTop: document.getElementById("abilityFamilyTop"),
    symbol: document.getElementById("abilitySymbol"),
    family: document.getElementById("abilityFamily"),
    name: document.getElementById("abilityName"),
    short: document.getElementById("abilityShort"),
    identity: document.getElementById("abilityIdentity"),
    tags: document.getElementById("abilityTags"),
    tagsSection: document.getElementById("abilityTagsSection"),
    extras: document.getElementById("abilityExtras"),
    description: document.getElementById("abilityDescription"),
    unlock: document.getElementById("abilityUnlock"),
    unlockSection: document.getElementById("unlockSection"),
    levels: document.getElementById("abilityLevels"),
    totalXp: document.getElementById("abilityTotalXp")
  };

  const normalizeKey = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const createField = (label, value) => {
    const wrapper = document.createElement("dl");
    wrapper.className = "identity-field";

    const dt = document.createElement("dt");
    dt.textContent = label;

    const dd = document.createElement("dd");
    dd.textContent = String(value);

    wrapper.append(dt, dd);
    return wrapper;
  };

  const powerRecords = data.powers.map((power, sourceIndex) => {
    const rawCategories = Array.isArray(power.categorias)
      ? power.categorias
      : power.categoria !== undefined
        ? [power.categoria]
        : power.origin
          ? [power.origin]
          : [];

    return {
      power,
      sourceIndex,
      categories: rawCategories.map(normalizeKey).filter(Boolean),
      card: null
    };
  });

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

  if (els.eyebrow) els.eyebrow.textContent = data.page?.eyebrow || "";
  if (els.title) els.title.textContent = data.page?.title || "PODERES";
  if (els.subtitle) els.subtitle.textContent = data.page?.subtitle || "";

  const renderTags = (tags) => {
    if (!els.tags || !els.tagsSection) return;
    els.tags.replaceChildren();

    if (!Array.isArray(tags) || tags.length === 0) {
      els.tagsSection.hidden = true;
      return;
    }

    els.tagsSection.hidden = false;
    const fragment = document.createDocumentFragment();
    tags.forEach((tagValue) => {
      const tag = document.createElement("span");
      tag.className = "ability-tag";
      tag.textContent = String(tagValue);
      fragment.appendChild(tag);
    });
    els.tags.appendChild(fragment);
  };

  const renderExtras = (extras) => {
    if (!els.extras) return;
    els.extras.replaceChildren();

    if (!Array.isArray(extras) || extras.length === 0) return;

    const fragment = document.createDocumentFragment();
    extras.forEach((field) => {
      if (!field || !field.label || field.value === undefined || field.value === "") return;
      fragment.appendChild(createField(field.label, field.value));
    });
    els.extras.appendChild(fragment);
  };

  const renderLevels = (levels) => {
    if (!els.levels || !els.totalXp) return;
    els.levels.replaceChildren();

    const list = Array.isArray(levels) ? levels : [];
    const fragment = document.createDocumentFragment();

    list.forEach((item) => {
      const row = document.createElement("article");
      row.className = "level-row";

      const badge = document.createElement("div");
      badge.className = "level-badge";
      badge.textContent = `N${item.level ?? "?"}`;

      const info = document.createElement("div");
      info.className = "level-info";

      const head = document.createElement("div");
      head.className = "level-head";

      const title = document.createElement("strong");
      title.textContent = item.title ? String(item.title) : `Nível ${item.level ?? "?"}`;

      const xp = document.createElement("span");
      xp.className = "level-xp";
      xp.textContent = item.xp ? String(item.xp) : "—";

      const desc = document.createElement("p");
      desc.textContent = item.description ? String(item.description) : "";

      head.append(title, xp);
      info.append(head, desc);
      row.append(badge, info);
      fragment.appendChild(row);
    });

    els.levels.appendChild(fragment);
    const lastLevel = list[list.length - 1];
    els.totalXp.textContent = lastLevel?.xp ? `MÁX. ${lastLevel.xp}` : "";
  };

  const openAbility = (power) => {
    if (!dialog) return;

    const code = power.codigo || power.id || "FILE";
    const name = power.nome || "SEM NOME";
    const levelCount = Array.isArray(power.levels) ? power.levels.length : 0;

    if (els.code) els.code.textContent = code;
    if (els.footerCode) els.footerCode.textContent = code;
    if (els.familyTop) els.familyTop.textContent = power.family || power.origin || "ARCANE";
    if (els.symbol) els.symbol.textContent = power.symbol || "✦";
    if (els.family) els.family.textContent = power.family || "ARCANE";
    if (els.name) els.name.textContent = name;
    if (els.short) els.short.textContent = power.summary || "";

    if (els.identity) {
      const identityFragment = document.createDocumentFragment();
      [
        ["FAMÍLIA", power.family],
        ["ORIGEM", power.origin],
        ["NÍVEIS", levelCount ? `1–${levelCount}` : undefined],
        ["CÓDIGO", code]
      ].forEach(([label, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          identityFragment.appendChild(createField(label, value));
        }
      });
      els.identity.replaceChildren(identityFragment);
    }

    renderTags(power.tags);
    renderExtras(power.extras);

    if (els.description) {
      els.description.textContent = power.description || "";
    }

    if (els.unlock && els.unlockSection) {
      const hasUnlock = Boolean(power.unlock);
      els.unlockSection.hidden = !hasUnlock;
      els.unlock.textContent = hasUnlock ? String(power.unlock) : "";
    }

    renderLevels(power.levels);

    if (!dialog.open) dialog.showModal();
    closeButton?.focus({ preventScroll: true });
  };

  const buildCard = (power, sourceIndex) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "power-card";
    card.dataset.powerIndex = String(sourceIndex);
    card.dataset.powerId = power.id || `power-${sourceIndex + 1}`;
    card.setAttribute("aria-label", `Abrir ficha do poder ${power.nome || `poder ${sourceIndex + 1}`}`);

    const accent = document.createElement("span");
    accent.className = "power-card-accent";
    accent.setAttribute("aria-hidden", "true");

    const levelFlag = document.createElement("span");
    levelFlag.className = "power-level-flag";

    const levelText = document.createElement("span");
    levelText.className = "power-level-text";
    levelText.textContent = String(Array.isArray(power.levels) ? power.levels.length : 0) || "0";
    levelFlag.appendChild(levelText);

    const symbolBox = document.createElement("span");
    symbolBox.className = "power-symbol-box";
    symbolBox.setAttribute("aria-hidden", "true");

    const symbol = document.createElement("span");
    symbol.className = "power-symbol";
    symbol.textContent = power.symbol || "✦";
    symbolBox.appendChild(symbol);

    const copy = document.createElement("div");
    copy.className = "power-copy";

    const family = document.createElement("span");
    family.className = "power-family";
    family.textContent = power.family || power.origin || "ARCANE";

    const name = document.createElement("h2");
    name.className = "power-name";
    name.textContent = power.nome || "SEM NOME";

    const summary = document.createElement("p");
    summary.className = "power-summary";
    summary.textContent = power.summary || "";

    const open = document.createElement("div");
    open.className = "power-open";

    const origin = document.createElement("span");
    origin.textContent = power.origin || "OPEN FILE";

    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "↗";

    open.append(origin, icon);
    copy.append(family, name, summary, open);
    card.append(accent, levelFlag, symbolBox, copy);
    return card;
  };

  const renderCardsOnce = () => {
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    powerRecords.forEach((record) => {
      record.card = buildCard(record.power, record.sourceIndex);
      fragment.appendChild(record.card);
    });
    grid.replaceChildren(fragment);
  };

  const configuredFilters = Array.isArray(data.page?.filters) && data.page.filters.length
    ? data.page.filters
    : [
        { id: "todos", label: "TODOS" },
        ...Array.from(new Set(powerRecords.flatMap((record) => record.categories))).map((id) => ({ id, label: id.toUpperCase() }))
      ];

  const filters = configuredFilters.map((filter, index) => ({
    id: normalizeKey(filter.id || filter.label || `filter-${index + 1}`),
    label: String(filter.label || filter.id || `FILTRO ${index + 1}`)
  }));

  if (!filters.some((filter) => filter.id === "todos")) {
    filters.unshift({ id: "todos", label: "TODOS" });
  }

  const countForFilter = (filterId) =>
    filterId === "todos"
      ? powerRecords.length
      : powerRecords.filter((record) => record.categories.includes(filterId)).length;

  let activeFilterId = filters[0]?.id || "todos";
  const filterButtons = new Map();

  const updateFilterStatus = (visibleCount) => {
    const activeFilter = filters.find((filter) => filter.id === activeFilterId);
    if (filterStatus) {
      filterStatus.textContent = `${activeFilter?.label || "TODOS"} // ${visibleCount.toString().padStart(2, "0")} REGISTROS`;
    }
    if (els.count) {
      els.count.textContent = `TOTAL ${visibleCount.toString().padStart(2, "0")}`;
    }
  };

  const applyFilter = (filterId) => {
    activeFilterId = filterId;
    let visibleCount = 0;

    powerRecords.forEach((record) => {
      const isVisible = filterId === "todos" || record.categories.includes(filterId);
      if (record.card) record.card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    filterButtons.forEach((button, id) => {
      const isActive = id === filterId;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
    updateFilterStatus(visibleCount);
  };

  const renderFilters = () => {
    if (!filtersRoot) return;
    const fragment = document.createDocumentFragment();

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

  grid?.addEventListener("click", (event) => {
    const card = event.target instanceof Element ? event.target.closest(".power-card") : null;
    if (!card) return;

    const index = Number(card.dataset.powerIndex);
    const record = Number.isInteger(index) ? powerRecords[index] : null;
    if (!record) return;
    openAbility(record.power);
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

  renderCardsOnce();
  renderFilters();
  applyFilter(activeFilterId);
})();
