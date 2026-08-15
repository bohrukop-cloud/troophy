const seedTracks = [
  ["Midnight Signal","Troop Artist","Electronic"],
  ["Afterlight","Troop Artist","Ambient"],
  ["Night Drive","Troop Artist","Electronic"],
  ["Open Skies","Troop Artist","Chill"],
  ["Parallel","Troop Artist","Alternative"],
  ["Slow Motion","Troop Artist","R&B"],
  ["Frequency","Troop Artist","Electronic"],
  ["After Hours","Troop Artist","Lo-fi"],
  ["Neon Dreams","Troop Artist","Synthwave"],
  ["Golden Hour","Troop Artist","Chill"],
  ["Static Hearts","Troop Artist","Alternative"],
  ["Ocean Lines","Troop Artist","Ambient"],
  ["Velvet Sky","Troop Artist","R&B"],
  ["Future Memory","Troop Artist","Electronic"],
  ["Blue Horizon","Troop Artist","Chill"],
  ["Lost Signals","Troop Artist","Synthwave"],
  ["Paper Planes","Troop Artist","Indie"],
  ["City Lights","Troop Artist","Electronic"],
  ["Moonlit","Troop Artist","Ambient"],
  ["First Light","Troop Artist","Chill"]
];

const TROOP_BOARD = Array.from(
  { length: 100 },
  (_, index) => {
    const source = seedTracks[index % seedTracks.length];

    return {
      rank: index + 1,
      title:
        index < seedTracks.length
          ? source[0]
          : `${source[0]} ${Math.floor(index / seedTracks.length) + 1}`,
      artist: source[1],
      genre: source[2]
    };
  }
);

const list = document.getElementById("tracks");
const player = document.getElementById("player");
const playerButton = document.getElementById("playerButton");
const title = document.getElementById("playerTitle");
const artist = document.getElementById("playerArtist");
const art = document.getElementById("playerArt");

let currentIndex = 0;
let playing = false;

function renderTracks() {
  if (!list) return;

  list.innerHTML = TROOP_BOARD.map(track => `
    <button
      class="track"
      type="button"
      data-index="${track.rank - 1}"
    >
      <span class="track-rank">
        ${String(track.rank).padStart(2, "0")}
      </span>

      <span class="track-art">
        ${track.title.charAt(0)}
      </span>

      <span class="track-info">
        <strong>${track.title}</strong>
        <small>${track.artist} · ${track.genre}</small>
      </span>

      <span class="track-arrow">▶</span>
    </button>
  `).join("");

  list.querySelectorAll(".track").forEach(button => {
    button.addEventListener("click", () => {
      playTrack(Number(button.dataset.index));
    });
  });
}

function playTrack(index) {
  const track = TROOP_BOARD[index];

  if (!track) return;

  currentIndex = index;
  playing = true;

  if (title) title.textContent = track.title;
  if (artist) artist.textContent = track.artist;
  if (art) art.textContent = String(track.rank).padStart(2, "0");

  if (playerButton) {
    playerButton.textContent = "❚❚";
  }

  if (player) {
    player.classList.add("active");
  }

  document.querySelectorAll(".track").forEach(item => {
    item.classList.remove("playing");
  });

  const active = document.querySelector(
    `.track[data-index="${index}"]`
  );

  if (active) {
    active.classList.add("playing");
    active.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  localStorage.setItem(
    "troophy-current-track",
    String(index)
  );
}

function togglePlay() {
  if (playing) {
    playing = false;

    if (playerButton) {
      playerButton.textContent = "▶";
    }

    return;
  }

  playTrack(currentIndex);
}

if (playerButton) {
  playerButton.addEventListener(
    "click",
    togglePlay
  );
}

renderTracks();

const savedTrack =
  Number(localStorage.getItem(
    "troophy-current-track"
  ));

if (
  Number.isInteger(savedTrack) &&
  savedTrack >= 0 &&
  savedTrack < TROOP_BOARD.length
) {
  currentIndex = savedTrack;
}

window.TROOP_BOARD = TROOP_BOARD;
