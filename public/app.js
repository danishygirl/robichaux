(() => {
  const data = window.COVEN_CONTENT;
  if (!data) return;

  const nav = document.getElementById("mainNav");
  const copy = document.getElementById("homeCopy");
  const actions = document.getElementById("homeActions");
  const currentPage = document.body.dataset.page || "home";

  if (nav) {
    data.menu.forEach((item) => {
      const link = document.createElement("a");
      link.className = `nav-link${item.id === currentPage ? " is-active" : ""}`;
      link.href = item.href;
      link.textContent = item.label;
      nav.appendChild(link);
    });
  }

  if (copy) {
    data.home.paragraphs.forEach((paragraph, index) => {
      const p = document.createElement("p");
      p.innerHTML = `<span class="paragraph-index">${String(index + 1).padStart(2, "0")}.</span>${paragraph}`;
      copy.appendChild(p);
    });
  }

  if (actions) {
    data.home.actions.forEach((item) => {
      const link = document.createElement("a");
      link.className = `action-button action-${item.style}`;
      link.href = item.href;
      link.textContent = item.label;

      if (item.label === "DISCORD" && item.href === "#discord") {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          link.classList.add("needs-link");
          link.textContent = "ADICIONE O LINK";
          window.setTimeout(() => {
            link.textContent = "DISCORD";
            link.classList.remove("needs-link");
          }, 1800);
        });
      }

      actions.appendChild(link);
    });
  }
})();
