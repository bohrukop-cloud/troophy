(function () {

  const source = window.TROOPHY_DATA || {};

  const apps = Array.isArray(source.apps)
    ? source.apps
    : [];

  const troops = Array.isArray(source.troops)
    ? source.troops
    : [];

  function normalizeApp(app, index) {

    return {
      id: app.id || `app-${index + 1}`,
      type: "app",

      name: app.name || "Unknown App",
      developer: app.developer || "Unknown Developer",

      category: app.category || "Other",

      description:
        app.description ||
        "Discover this app on Troophy.",

      icon:
        app.icon ||
        (app.name || "?").charAt(0),

      url:
        app.url ||
        "#",

      rating:
        Number(app.rating) || 0,

      trend:
        Number(app.trend) || 0,

      status:
        app.status || "Trending",

      source:
        app.source || "Troophy",

      searchable: [
        app.name,
        app.developer,
        app.category,
        app.description,
        "app"
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
    };

  }

  function normalizeMusic(track, index) {

    return {
      id:
        track.id ||
        `track-${index + 1}`,

      type: "music",

      name:
        track.title ||
        track.name ||
        `Track ${index + 1}`,

      artist:
        track.artist ||
        "Unknown Artist",

      category:
        track.genre ||
        track.category ||
        "Music",

      description:
        track.description ||
        "Discover this track on Troop Board 100.",

      icon:
        track.art ||
        track.cover ||
        "♪",

      url:
        track.url ||
        "#",

      rating:
        Number(track.rating) || 0,

      trend:
        Number(track.trend) || 0,

      status:
        track.status || "Trending",

      source:
        track.source || "Troop Board 100",

      searchable: [
        track.title,
        track.name,
        track.artist,
        track.genre,
        "music"
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
    };

  }

  const normalizedApps =
    apps.map(normalizeApp);

  const normalizedMusic =
    troops.map(normalizeMusic);

  const items = [
    ...normalizedApps,
    ...normalizedMusic
  ];

  function all() {
    return [...items];
  }

  function appsOnly() {
    return items.filter(
      item => item.type === "app"
    );
  }

  function musicOnly() {
    return items.filter(
      item => item.type === "music"
    );
  }

  function search(query, options = {}) {

    const q =
      String(query || "")
        .trim()
        .toLowerCase();

    if (!q) return [];

    let results = items;

    if (options.type) {

      results =
        results.filter(
          item =>
            item.type === options.type
        );

    }

    return results
      .map(item => {

        let score = 0;

        if (
          item.name
            .toLowerCase()
            .includes(q)
        ) {
          score += 100;
        }

        if (
          item.searchable
            .includes(q)
        ) {
          score += 50;
        }

        const words =
          q.split(/\s+/);

        words.forEach(word => {

          if (
            item.searchable
              .includes(word)
          ) {
            score += 10;
          }

        });

        score +=
          Math.min(
            Number(item.trend) || 0,
            100
          ) * .1;

        return {
          ...item,
          searchScore: score
        };

      })
      .filter(
        item =>
          item.searchScore > 0
      )
      .sort(
        (a, b) =>
          b.searchScore -
          a.searchScore
      );

  }

  function trending(limit = 20) {

    return items
      .slice()
      .sort(
        (a, b) =>
          (b.trend || 0) -
          (a.trend || 0)
      )
      .slice(0, limit);

  }

  function byCategory(category) {

    return items.filter(
      item =>
        String(item.category)
          .toLowerCase() ===
        String(category)
          .toLowerCase()
    );

  }

  window.TroophyForge = {

    items,

    all,
    appsOnly,
    musicOnly,

    search,
    trending,
    byCategory

  };

  console.log(
    `Troophy Data Forge online: ${items.length} items`
  );

})();
