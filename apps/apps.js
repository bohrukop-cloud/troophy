const apps = [
  {
    name: "Discover App",
    category: "productivity",
    description: "A focused space for ideas and everyday discovery.",
    icon: "D",
    rank: 1,
    playUrl: "https://play.google.com/"
  },

  {
    name: "Connect",
    category: "social",
    description: "Explore new ways to stay connected.",
    icon: "C",
    rank: 2,
    playUrl: "https://play.google.com/"
  },

  {
    name: "Studio",
    category: "entertainment",
    description: "Creative tools and entertainment in one place.",
    icon: "S",
    rank: 3,
    playUrl: "https://play.google.com/"
  },

  {
    name: "Focus",
    category: "productivity",
    description: "Tools designed to help you focus on what matters.",
    icon: "F",
    rank: 4,
    playUrl: "https://play.google.com/"
  },

  {
    name: "Social Hub",
    category: "social",
    description: "Discover communities and conversations.",
    icon: "H",
    rank: 5,
    playUrl: "https://play.google.com/"
  },

  {
    name: "Play Zone",
    category: "entertainment",
    description: "A collection of entertainment worth exploring.",
    icon: "P",
    rank: 6,
    playUrl: "https://play.google.com/"
  }
];

const grid = document.getElementById("appsGrid");
const filters = document.querySelectorAll(".filter-button");

function renderApps(filter = "all") {

  grid.innerHTML = "";

  const filtered =
    filter === "all"
      ? apps
      : apps.filter(app => app.category === filter);

  filtered.forEach(app => {

    const card = document.createElement("article");

    card.className = "app-card";

    card.innerHTML = `
      <div>
        <div class="app-icon">
          ${app.icon}
        </div>

        <div class="app-category">
          ${app.category.toUpperCase()}
        </div>

        <h2>${app.name}</h2>

        <p>${app.description}</p>
      </div>

      <div class="app-bottom">

        <span class="app-rank">
          #${app.rank} DISCOVERY
        </span>

        <a
          class="play-button"
          href="${app.playUrl}"
          target="_blank"
          rel="noopener"
        >
          Google Play ↗
        </a>

      </div>
    `;

    grid.appendChild(card);
  });
}

filters.forEach(button => {

  button.addEventListener("click", () => {

    filters.forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");

    renderApps(button.dataset.filter);
  });

});

renderApps();
