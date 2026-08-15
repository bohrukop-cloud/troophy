
(function () {

  const data = window.TROOPHY_DATA;

  if (!data) {
    console.error("Troophy data layer failed to load.");
    return;
  }

  window.Troophy = {

    apps: data.apps,
    categories: data.categories,
    troops: data.troops,

    trending(limit = 6) {
      return [...data.apps]
        .sort((a, b) => b.trend - a.trend)
        .slice(0, limit);
    },

    rising(limit = 6) {
      return data.apps
        .filter(app => app.status === "Rising")
        .sort((a, b) => b.trend - a.trend)
        .slice(0, limit);
    },

    random() {
      return data.apps[
        Math.floor(Math.random() * data.apps.length)
      ];
    },

    byCategory(category) {
      return data.apps.filter(
        app => app.category === category
      );
    },

    troopBoard(limit = 5) {
      return data.troops.slice(0, limit);
    }

  };

  function createAppCard(app) {
    return `
      <article class="app-card">
        <div class="app-card-top">
          <div class="app-icon">${app.icon}</div>
          <span class="trend-score">${app.trend}</span>
        </div>

        <div class="app-card-body">
          <span class="app-category">${app.category}</span>
          <h3>${app.name}</h3>
          <p>${app.description}</p>
        </div>

        <a
          class="app-action"
          href="${app.url}"
          target="_blank"
          rel="noopener"
        >
          Explore →
        </a>
      </article>
    `;
  }

  function renderTrending() {
    const container = document.getElementById("trendingApps");

    if (!container) return;

    container.innerHTML =
      Troophy.trending()
        .map(createAppCard)
        .join("");
  }

  document.addEventListener(
    "DOMContentLoaded",
    renderTrending
  );

  console.log("Troophy Command Center loaded.");

})();
