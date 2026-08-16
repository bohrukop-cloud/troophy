(function () {

  const data = window.TROOPHY_DATA || {};
  const apps = Array.isArray(data.apps) ? data.apps : [];

  const STORAGE_KEY = "troophy-live-signals";

  function loadSignals() {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || {};
    } catch {
      return {};
    }
  }

  function saveSignals(signals) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(signals)
    );
  }

  function signalFor(app) {
    const signals = loadSignals();

    if (!signals[app.id]) {
      signals[app.id] = {
        views: 0,
        clicks: 0,
        firstSeen: Date.now()
      };

      saveSignals(signals);
    }

    return signals[app.id];
  }

  function recordView(app) {
    if (!app?.id) return;

    const signals = loadSignals();
    const item = signalFor(app);

    item.views += 1;
    item.lastView = Date.now();

    signals[app.id] = item;

    saveSignals(signals);
  }

  function recordClick(app) {
    if (!app?.id) return;

    const signals = loadSignals();
    const item = signalFor(app);

    item.clicks += 1;
    item.lastClick = Date.now();

    signals[app.id] = item;

    saveSignals(signals);
  }

  function freshness(app) {

    const created =
      Number(
        app.createdAt ||
        app.firstSeen ||
        Date.now()
      );

    const age =
      Math.max(
        0,
        Date.now() - created
      );

    const hours =
      age / 36e5;

    if (hours < 6) return 30;
    if (hours < 24) return 20;
    if (hours < 72) return 10;
    if (hours < 168) return 5;

    return 0;
  }

  function velocity(app) {

    const signal =
      signalFor(app);

    const views =
      signal.views || 0;

    const clicks =
      signal.clicks || 0;

    return (
      Math.min(views * 2, 30) +
      Math.min(clicks * 5, 30)
    );
  }

  function momentum(app) {

    const base =
      Number(app.trend) || 0;

    const rating =
      Number(app.rating) || 0;

    const rising =
      app.status === "Rising"
        ? 25
        : 0;

    return (
      base * 1.4 +
      rating * 7 +
      rising +
      freshness(app) +
      velocity(app)
    );
  }

  function rank(list = apps) {

    return [...list]
      .map(app => ({
        ...app,
        liveScore:
          Math.round(
            momentum(app)
          )
      }))
      .sort(
        (a, b) =>
          b.liveScore -
          a.liveScore
      );
  }

  function trending(limit = 10) {
    return rank().slice(0, limit);
  }

  function rising(limit = 10) {

    return rank()
      .filter(
        app =>
          app.status === "Rising" ||
          freshness(app) > 0
      )
      .slice(0, limit);

  }

  function getBadge(app) {

    const fresh =
      freshness(app);

    if (fresh >= 30)
      return "JUST IN";

    if (app.status === "Rising")
      return "RISING";

    if (
      (Number(app.trend) || 0) >= 90
    )
      return "HOT";

    return "TRENDING";
  }

  window.TroophyLive = {

    apps,

    recordView,
    recordClick,

    freshness,
    velocity,
    momentum,

    rank,
    trending,
    rising,

    getBadge

  };

  console.log(
    "Troophy Live Ranking Engine online."
  );

})();
