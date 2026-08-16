(function () {

  function search(query, type = null) {

    if (!window.TroophyForge) {
      return [];
    }

    return window.TroophyForge.search(
      query,
      type ? { type } : {}
    );

  }

  function apps(query) {
    return search(query, "app");
  }

  function music(query) {
    return search(query, "music");
  }

  function everything(query) {
    return search(query);
  }

  window.TroophySearch = {
    search,
    apps,
    music,
    everything
  };

})();
