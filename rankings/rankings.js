(function () {

  const data =
    window.TROOPHY_DATA || {};

  const apps =
    Array.isArray(data.apps)
      ? data.apps
      : [];

  const list =
    document.getElementById("rankList");

  const search =
    document.getElementById("rankSearch");

  const controls =
    document.querySelectorAll(
      ".rank-filter"
    );

  let activeFilter = "global";

  function escapeHTML(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }

  function rankedApps() {

    if (window.TroophyLive) {

      return window.TroophyLive
        .rank(apps);

    }

    return [...apps]
      .sort(
        (a, b) =>
          (Number(b.trend) || 0) -
          (Number(a.trend) || 0)
      );

  }

  function filterApps(items) {

    switch (activeFilter) {

      case "rising":

        return items.filter(
          app =>
            app.status === "Rising"
        );

      case "hot":

        return items.filter(
          app =>
            Number(app.trend || 0) >= 80
        );

      case "fresh":

        return items.filter(
          app =>
            app.status === "New" ||
            app.status === "Rising"
        );

      default:

        return items;

    }

  }

  function render() {

    const query =
      search.value
        .trim()
        .toLowerCase();

    let items =
      filterApps(
        rankedApps()
      );

    if (query) {

      items =
        items.filter(app => {

          const text = [
            app.name,
            app.developer,
            app.category,
            app.description
          ]
            .join(" ")
            .toLowerCase();

          return text.includes(query);

        });

    }

    items =
      items.slice(0, 100);

    if (!items.length) {

      list.innerHTML = `
        <div class="rank-empty">
          Nothing found in this ranking.
        </div>
      `;

      return;

    }

    list.innerHTML =
      items.map(
        (app, index) => {

          const score =
            app.liveScore ??
            app.trend ??
            0;

          const badge =
            window.TroophyLive
              ? window.TroophyLive.getBadge(app)
              : (
                  app.status ||
                  "TRENDING"
                );

          const movement =
            app.status === "Rising"
              ? "↑"
              : badge === "HOT"
                ? "•"
                : "—";

          const movementClass =
            movement === "↑"
              ? "movement-up"
              : movement === "•"
                ? "movement-hot"
                : "";

          const url =
            app.id
              ? `../apps/details/?app=${encodeURIComponent(app.id)}`
              : (
                  app.url ||
                  "../apps/"
                );

          return `

            <a
              class="rank-item"
              href="${url}"
            >

              <span class="rank-number">
                ${String(index + 1).padStart(2, "0")}
              </span>

              <span class="rank-icon">
                ${escapeHTML(
                  app.icon ||
                  app.name?.charAt(0) ||
                  "?"
                )}
              </span>

              <span class="rank-name">

                <strong>
                  ${escapeHTML(
                    app.name ||
                    "Unknown"
                  )}
                </strong>

                <small>
                  ${escapeHTML(
                    app.category ||
                    "Discovery"
                  )}
                  ·
                  ${escapeHTML(badge)}
                </small>

              </span>

              <span class="rank-score">
                ${score}
              </span>

              <span
                class="rank-movement ${movementClass}"
              >
                ${movement}
              </span>

            </a>

          `;

        }
      ).join("");

  }

  controls.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        controls.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

        button.classList.add(
          "active"
        );

        activeFilter =
          button.dataset.filter;

        render();

      }
    );

  });

  search.addEventListener(
    "input",
    render
  );

  render();

})();
