(function () {

  const overlay = document.createElement("div");

  overlay.className = "global-search-overlay";

  overlay.innerHTML = `
    <div class="global-search-panel">

      <div class="global-search-head">

        <strong>Search Troophy</strong>

        <button
          type="button"
          id="closeGlobalSearch"
          aria-label="Close search"
        >ESC</button>

      </div>

      <div class="global-search-input-wrap">

        <span>⌕</span>

        <input
          id="globalSearchInput"
          type="search"
          autocomplete="off"
          placeholder="Apps, music, categories..."
        >

      </div>

      <div
        class="global-search-results"
        id="globalSearchResults"
      ></div>

    </div>
  `;

  document.body.appendChild(overlay);

  const input =
    document.getElementById("globalSearchInput");

  const results =
    document.getElementById("globalSearchResults");

  const close =
    document.getElementById("closeGlobalSearch");

  const data =
    window.TROOPHY_DISCOVERY || {};

  const apps =
    data.apps || [];

  const music =
    window.TROOP_BOARD || [];

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function openSearch() {

    overlay.classList.add("open");

    setTimeout(
      () => input?.focus(),
      50
    );

  }

  function closeSearch() {

    overlay.classList.remove("open");

    if (input) {
      input.value = "";
    }

    if (results) {
      results.innerHTML = "";
    }

  }

  function search(query) {

    const q =
      query.trim().toLowerCase();

    if (!q) {

      results.innerHTML = `
        <div class="search-hint">
          Start typing to discover something.
        </div>
      `;

      return;
    }

    const appResults =
      apps.filter(app =>
        [
          app.name,
          app.developer,
          app.category,
          app.description
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6);

    const musicResults =
      music.filter(track =>
        [
          track.title,
          track.artist,
          track.genre
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6);

    let html = "";

    if (appResults.length) {

      html += `
        <div class="search-group">

          <span class="search-group-title">
            APPS
          </span>

          ${appResults.map(app => `

            <a
              class="search-result"
              href="/troophy/apps/details/?app=${encodeURIComponent(app.id)}"
            >

              <span class="search-result-icon">
                ${escapeHTML(app.name.charAt(0))}
              </span>

              <span>
                <strong>
                  ${escapeHTML(app.name)}
                </strong>

                <small>
                  ${escapeHTML(app.category)}
                  · ★ ${escapeHTML(app.rating)}
                </small>
              </span>

              <span>↗</span>

            </a>

          `).join("")}

        </div>
      `;
    }

    if (musicResults.length) {

      html += `
        <div class="search-group">

          <span class="search-group-title">
            TROOP BOARD
          </span>

          ${musicResults.map(track => `

            <a
              class="search-result"
              href="/troophy/music/"
            >

              <span class="search-result-icon">
                ▶
              </span>

              <span>
                <strong>
                  ${escapeHTML(track.title)}
                </strong>

                <small>
                  ${escapeHTML(track.artist)}
                  · ${escapeHTML(track.genre)}
                </small>
              </span>

              <span>↗</span>

            </a>

          `).join("")}

        </div>
      `;
    }

    if (!html) {

      html = `
        <div class="search-empty">

          <strong>
            Nothing found.
          </strong>

          <span>
            Try another word.
          </span>

        </div>
      `;

    }

    results.innerHTML = html;
  }

  document.addEventListener(
    "click",
    event => {

      const trigger =
        event.target.closest(
          "[data-global-search]"
        );

      if (trigger) {
        event.preventDefault();
        openSearch();
      }

    }
  );

  document.addEventListener(
    "keydown",
    event => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();
        openSearch();

      }

      if (
        event.key === "/" &&
        document.activeElement !== input
      ) {

        event.preventDefault();
        openSearch();

      }

      if (
        event.key === "Escape" &&
        overlay.classList.contains("open")
      ) {

        closeSearch();

      }

    }
  );

  close?.addEventListener(
    "click",
    closeSearch
  );

  overlay.addEventListener(
    "click",
    event => {

      if (event.target === overlay) {
        closeSearch();
      }

    }
  );

  input?.addEventListener(
    "input",
    event => {
      search(event.target.value);
    }
  );

  window.TroophySearch = {
    open: openSearch,
    close: closeSearch
  };

})();
