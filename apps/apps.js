const TROOPHY_APPS = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    developer: "OpenAI",
    category: "AI",
    type: "Productivity",
    description: "AI assistant for writing, learning, brainstorming and getting things done.",
    rating: "4.7",
    badge: "TRENDING",
    play: "https://play.google.com/store/apps/"
  },
  {
    id: "spotify",
    name: "Spotify",
    developer: "Spotify",
    category: "Music",
    type: "Entertainment",
    description: "Discover music, podcasts and playlists for every moment.",
    rating: "4.5",
    badge: "HOT",
    play: "https://play.google.com/store/apps/"
  },
  {
    id: "capcut",
    name: "CapCut",
    developer: "Bytedance",
    category: "Creative",
    type: "Video",
    description: "Create polished videos with powerful editing and creative tools.",
    rating: "4.4",
    badge: "TRENDING",
    play: "https://play.google.com/store/apps/"
  },
  {
    id: "instagram",
    name: "Instagram",
    developer: "Meta",
    category: "Social",
    type: "Social",
    description: "Share photos, videos, stories and discover creators.",
    rating: "4.3",
    badge: "POPULAR",
    play: "https://play.google.com/store/apps/"
  },
  {
    id: "youtube",
    name: "YouTube",
    developer: "Google",
    category: "Video",
    type: "Entertainment",
    description: "Watch, discover and share videos from around the world.",
    rating: "4.2",
    badge: "POPULAR",
    play: "https://play.google.com/store/apps/"
  },
  {
    id: "telegram",
    name: "Telegram",
    developer: "Telegram",
    category: "Social",
    type: "Communication",
    description: "Fast messaging with groups, channels and communities.",
    rating: "4.5",
    badge: "RISING",
    play: "https://play.google.com/store/apps/"
  },
  {
    id: "notion",
    name: "Notion",
    developer: "Notion Labs",
    category: "Productivity",
    type: "Productivity",
    description: "Notes, projects, documents and knowledge in one workspace.",
    rating: "4.6",
    badge: "RISING",
    play: "https://play.google.com/store/apps/"
  },
  {
    id: "pinterest",
    name: "Pinterest",
    developer: "Pinterest",
    category: "Lifestyle",
    type: "Discovery",
    description: "Find inspiration for ideas, style, food, travel and more.",
    rating: "4.5",
    badge: "POPULAR",
    play: "https://play.google.com/store/apps/"
  }
];

const grid = document.getElementById("appsGrid");
const search = document.getElementById("appSearch");
const filters = document.querySelectorAll("[data-filter]");

let activeFilter = "all";

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getFilteredApps() {
  const query = search ? search.value.trim().toLowerCase() : "";

  return TROOPHY_APPS.filter(app => {
    const matchesFilter =
      activeFilter === "all" ||
      app.category.toLowerCase() === activeFilter.toLowerCase();

    const haystack = [
      app.name,
      app.developer,
      app.category,
      app.type,
      app.description
    ].join(" ").toLowerCase();

    return matchesFilter && haystack.includes(query);
  });
}

function renderApps() {
  if (!grid) return;

  const apps = getFilteredApps();

  if (!apps.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <strong>Nothing found.</strong>
        <span>Try another search or category.</span>
      </div>
    `;
    return;
  }

  grid.innerHTML = apps.map((app, index) => `
    <article class="app-card" data-app="${escapeHTML(app.id)}">

      <div class="app-card-top">
        <span class="app-rank">
          #${String(index + 1).padStart(2, "0")}
        </span>

        <span class="app-badge">
          ${escapeHTML(app.badge)}
        </span>
      </div>

      <div class="app-icon" aria-hidden="true">
        ${escapeHTML(app.name.charAt(0))}
      </div>

      <div class="app-category">
        ${escapeHTML(app.category)}
      </div>

      <h2>${escapeHTML(app.name)}</h2>

      <div class="app-developer">
        ${escapeHTML(app.developer)}
      </div>

      <p>
        ${escapeHTML(app.description)}
      </p>

      <div class="app-meta">
        <span>★ ${escapeHTML(app.rating)}</span>
        <span>${escapeHTML(app.type)}</span>
      </div>

      <a
        class="play-button"
        href="${escapeHTML(app.play)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Google Play ↗
      </a>

    </article>
  `).join("");
}

if (search) {
  search.addEventListener("input", renderApps);
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";

    filters.forEach(item => {
      item.classList.toggle(
        "active",
        item === button
      );
    });

    renderApps();
  });
});

renderApps();

window.TROOPHY_APPS = TROOPHY_APPS;
