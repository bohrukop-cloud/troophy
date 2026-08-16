(function () {

  const data = window.TROOPHY_DATA;

  if (!data) {
    console.error("Troophy data layer failed to load.");
    return;
  }

  const apps = Array.isArray(data.apps) ? data.apps : [];
  const categories = Array.isArray(data.categories)
    ? data.categories
    : [];
  const troops = Array.isArray(data.troops)
    ? data.troops
    : [];

  window.Troophy = {

    apps,
    categories,
    troops,

    trending(limit = 6) {
      return [...apps]
        .sort((a, b) => (b.trend || 0) - (a.trend || 0))
        .slice(0, limit);
    },

    rising(limit = 6) {
      return apps
        .filter(app => app.status === "Rising")
        .sort((a, b) => (b.trend || 0) - (a.trend || 0))
        .slice(0, limit);
    },

    random() {
      if (!apps.length) return null;

      return apps[
        Math.floor(Math.random() * apps.length)
      ];
    },

    byCategory(category) {
      return apps.filter(
        app => app.category === category
      );
    },

    troopBoard(limit = 5) {
      return troops.slice(0, limit);
    }

  };

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function appLink(app) {

    if (app.id) {
      return `apps/details/?app=${encodeURIComponent(app.id)}`;
    }

    return app.url || "apps/";
  }

  function createAppCard(app, index = 0) {

    const icon =
      app.icon ||
      app.name?.charAt(0) ||
      "?";

    return `
      <article class="app-card command-card">

        <div class="app-card-top">

          <div class="app-icon">
            ${escapeHTML(icon)}
          </div>

          <span class="trend-score">
            #${String(index + 1).padStart(2, "0")}
          </span>

        </div>

        <div class="app-card-body">

          <span class="app-category">
            ${escapeHTML(app.category || "Discovery")}
          </span>

          <h3>
            ${escapeHTML(app.name || "Unknown")}
          </h3>

          <p>
            ${escapeHTML(
              app.description ||
              "Discover something new."
            )}
          </p>

        </div>

        <a
          class="app-action"
          href="${appLink(app)}"
        >
          Explore →
        </a>

      </article>
    `;
  }

  function renderTrending() {

    const container =
      document.getElementById("trendingApps");

    if (!container) return;

    container.innerHTML =
      Troophy.trending()
        .map(createAppCard)
        .join("");

  }

  function renderRising() {

    const container =
      document.getElementById("risingApps");

    if (!container) return;

    const rising =
      Troophy.rising();

    container.innerHTML =
      rising.length
        ? rising.map(createAppCard).join("")
        : `
          <div class="command-empty">
            <strong>Rising soon.</strong>
            <span>Fresh discoveries are coming.</span>
          </div>
        `;
  }

  function renderTroopBoard() {

    const container =
      document.getElementById("troopBoardPreview");

    if (!container) return;

    const board =
      Troophy.troopBoard(8);

    container.innerHTML =
      board.map((track, index) => {

        const title =
          track.title ||
          track.name ||
          `Troop Track ${index + 1}`;

        const artist =
          track.artist ||
          track.author ||
          "Troop Board";

        return `
          <a
            class="troop-preview-row"
            href="music/"
          >

            <span class="troop-rank">
              ${String(index + 1).padStart(2, "0")}
            </span>

            <span class="troop-play">
              ▶
            </span>

            <span class="troop-track-info">

              <strong>
                ${escapeHTML(title)}
              </strong>

              <small>
                ${escapeHTML(artist)}
              </small>

            </span>

            <span class="troop-arrow">
              ↗
            </span>

          </a>
        `;

      }).join("");
  }

  function renderCategories() {

    const container =
      document.getElementById("categoryCloud");

    if (!container) return;

    container.innerHTML =
      categories.map(category => {

        const count =
          Troophy.byCategory(category).length;

        return `
          <a
            class="category-pill"
            href="apps/"
          >

            <span>
              ${escapeHTML(category)}
            </span>

            <small>
              ${count}
            </small>

          </a>
        `;

      }).join("");
  }

  function surpriseMe() {

    const app =
      Troophy.random();

    if (!app) return;

    const destination =
      app.id
        ? `apps/details/?app=${encodeURIComponent(app.id)}`
        : app.url || "apps/";

    window.location.href =
      destination;
  }

  function wireSurpriseButtons() {

    document
      .querySelectorAll(
        "[data-surprise], #surpriseMe, #surpriseButton"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          surpriseMe
        );

      });

  }

  function wireTrendingMore() {

    const button =
      document.getElementById("trendingMore");

    if (!button) return;

    button.addEventListener(
      "click",
      () => {
        window.location.href = "apps/";
      }
    );

  }

  function updateYear() {

    const year =
      document.getElementById("year");

    if (year) {
      year.textContent =
        new Date().getFullYear();
    }

  }

  function init() {

    renderTrending();
    renderRising();
    renderTroopBoard();
    renderCategories();

    wireSurpriseButtons();
    wireTrendingMore();

    updateYear();

    console.log(
      "Troophy World Command Center online.",
      {
        apps: apps.length,
        categories: categories.length,
        troops: troops.length
      }
    );

  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
