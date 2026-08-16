(function () {

  const data = window.TROOPHY_DATA || {
    apps: [],
    categories: []
  };

  const apps = Array.isArray(data.apps)
    ? data.apps
    : [];

  const STORAGE_KEY = "troophy-discovery-profile";

  function loadProfile() {

    try {

      return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || {
        views: {},
        categories: {},
        dismissed: [],
        discoveries: []
      };

    } catch {

      return {
        views: {},
        categories: {},
        dismissed: [],
        discoveries: []
      };

    }

  }

  function saveProfile(profile) {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile)
    );

  }

  function remember(app) {

    if (!app) return;

    const profile = loadProfile();

    profile.views[app.id] =
      (profile.views[app.id] || 0) + 1;

    if (app.category) {

      profile.categories[app.category] =
        (profile.categories[app.category] || 0) + 1;

    }

    profile.discoveries = [
      app.id,
      ...profile.discoveries.filter(
        id => id !== app.id
      )
    ].slice(0, 20);

    saveProfile(profile);

  }

  function dismiss(app) {

    if (!app) return;

    const profile = loadProfile();

    if (!profile.dismissed.includes(app.id)) {

      profile.dismissed.push(app.id);

    }

    saveProfile(profile);

  }

  function score(app) {

    const profile = loadProfile();

    const views =
      profile.views[app.id] || 0;

    const categoryAffinity =
      app.category
        ? profile.categories[app.category] || 0
        : 0;

    const trend =
      Number(app.trend) || 0;

    const rating =
      Number(app.rating) || 0;

    const rising =
      app.status === "Rising"
        ? 20
        : 0;

    return (
      trend * 1.5 +
      rating * 8 +
      categoryAffinity * 12 +
      rising +
      Math.min(views * 2, 10)
    );

  }

  function forYou(limit = 6) {

    const profile = loadProfile();

    return apps
      .filter(
        app =>
          !profile.dismissed.includes(app.id)
      )
      .map(app => ({
        ...app,
        recommendationScore:
          score(app)
      }))
      .sort(
        (a, b) =>
          b.recommendationScore -
          a.recommendationScore
      )
      .slice(0, limit);

  }

  function because(category, limit = 6) {

    return apps
      .filter(
        app => app.category === category
      )
      .sort(
        (a, b) =>
          (Number(b.trend) || 0) -
          (Number(a.trend) || 0)
      )
      .slice(0, limit);

  }

  function fresh(limit = 6) {

    return apps
      .filter(
        app => app.status === "Rising"
      )
      .sort(
        (a, b) =>
          (Number(b.trend) || 0) -
          (Number(a.trend) || 0)
      )
      .slice(0, limit);

  }

  function discover() {

    const profile = loadProfile();

    const candidates =
      apps.filter(
        app =>
          !profile.dismissed.includes(app.id)
      );

    if (!candidates.length) return null;

    const weighted =
      candidates.map(app => ({
        app,
        weight:
          Math.max(
            1,
            score(app)
          )
      }));

    const total =
      weighted.reduce(
        (sum, item) =>
          sum + item.weight,
        0
      );

    let random =
      Math.random() * total;

    for (const item of weighted) {

      random -= item.weight;

      if (random <= 0) {
        remember(item.app);
        return item.app;
      }

    }

    return candidates[0];

  }

  window.TroophyRecommendations = {

    remember,
    dismiss,
    score,
    forYou,
    because,
    fresh,
    discover,

    profile() {
      return loadProfile();
    }

  };

})();
