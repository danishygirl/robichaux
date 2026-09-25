(() => {
  "use strict";

  const site = window.COVEN_CONTENT;
  const data = window.COVEN_MAP;
  if (!site || !data || !Array.isArray(data.places) || !data.places.length) return;

  const nav = document.getElementById("mainNav");
  const list = document.getElementById("placesList");
  const dialog = document.getElementById("placeDialog");
  const dialogClose = document.getElementById("placeDialogClose");
  const detailButton = document.getElementById("placeDetailButton");
  const currentPage = document.body.dataset.page || "mapa";

  const els = {
    eyebrow: document.getElementById("mapEyebrow"),
    title: document.getElementById("mapTitle"),
    subtitle: document.getElementById("mapSubtitle"),
    count: document.getElementById("placesCount"),
    image: document.getElementById("placeImage"),
    district: document.getElementById("placeDistrict"),
    code: document.getElementById("placeCode"),
    name: document.getElementById("placeName"),
    description: document.getElementById("placeDescription"),
    tags: document.getElementById("placeTags"),
    dialogImage: document.getElementById("dialogPlaceImage"),
    dialogDistrict: document.getElementById("dialogPlaceDistrict"),
    dialogCode: document.getElementById("dialogPlaceCode"),
    dialogName: document.getElementById("dialogPlaceName"),
    dialogDescription: document.getElementById("dialogPlaceDescription"),
    dialogExtras: document.getElementById("dialogPlaceExtras")
  };

  let activeIndex = 0;
  const placeButtons = [];

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
els.eyebrow.textContent = data.page?.eyebrow || "";
  els.title.textContent = data.page?.title || "MAPA";
  els.subtitle.textContent = data.page?.subtitle || "";
  els.count.textContent = String(data.places.length).padStart(2, "0");

  const renderTags = (tags) => {
    els.tags.replaceChildren();
    if (!Array.isArray(tags) || !tags.length) {
      els.tags.hidden = true;
      return;
    }
    els.tags.hidden = false;
    const fragment = document.createDocumentFragment();
    tags.forEach((tagValue) => {
      const tag = document.createElement("span");
      tag.className = "place-tag";
      tag.textContent = String(tagValue);
      fragment.appendChild(tag);
    });
    els.tags.appendChild(fragment);
  };

  const renderPlace = (index) => {
    const place = data.places[index];
    if (!place) return;
    activeIndex = index;

    els.image.src = place.image || "";
    els.image.alt = place.name ? `Imagem de ${place.name}` : "Imagem do local";
    els.district.textContent = place.district || "NEW ORLEANS";
    els.code.textContent = place.code || "";
    els.name.textContent = place.name || "LOCAL";
    els.description.textContent = place.description || "";
    renderTags(place.tags);

    placeButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  const openDialog = () => {
    const place = data.places[activeIndex];
    if (!place || !dialog) return;

    els.dialogImage.src = place.image || "";
    els.dialogImage.alt = place.name ? `Imagem de ${place.name}` : "Imagem do local";
    els.dialogDistrict.textContent = place.district || "NEW ORLEANS";
    els.dialogCode.textContent = place.code || "";
    els.dialogName.textContent = place.name || "LOCAL";
    els.dialogDescription.textContent = place.description || "";

    const extras = document.createDocumentFragment();
    if (Array.isArray(place.extras)) {
      place.extras.forEach((field) => {
        if (!field?.label || field.value === undefined || field.value === "") return;
        const row = document.createElement("dl");
        row.className = "place-extra-row";
        const dt = document.createElement("dt");
        dt.textContent = String(field.label);
        const dd = document.createElement("dd");
        dd.textContent = String(field.value);
        row.append(dt, dd);
        extras.appendChild(row);
      });
    }
    els.dialogExtras.replaceChildren(extras);

    if (!dialog.open) dialog.showModal();
    dialogClose?.focus({ preventScroll: true });
  };

  const renderMenu = () => {
    const fragment = document.createDocumentFragment();
    data.places.forEach((place, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "place-nav-item";
      button.dataset.placeIndex = String(index);

      const indexEl = document.createElement("span");
      indexEl.className = "place-nav-index";
      indexEl.textContent = String(index + 1).padStart(2, "0");

      const name = document.createElement("span");
      name.className = "place-nav-name";
      name.textContent = place.name || `LOCAL ${index + 1}`;

      const marker = document.createElement("span");
      marker.className = "place-nav-marker";
      marker.setAttribute("aria-hidden", "true");

      button.append(indexEl, name, marker);
      button.addEventListener("click", () => renderPlace(index));
      placeButtons.push(button);
      fragment.appendChild(button);
    });
    list.replaceChildren(fragment);
  };

  detailButton?.addEventListener("click", openDialog);
  dialogClose?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside = rect.top <= event.clientY && event.clientY <= rect.bottom && rect.left <= event.clientX && event.clientX <= rect.right;
    if (!inside) dialog.close();
  });

  renderMenu();
  renderPlace(0);
})();
