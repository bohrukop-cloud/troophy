const tracks = [
  ["Troophy Intro", "Troophy"],
  ["Night Drive", "Troop Artist"],
  ["Afterlight", "Troop Artist"],
  ["New Perspective", "Troop Artist"],
  ["Midnight Signal", "Troop Artist"],
  ["Parallel", "Troop Artist"],
  ["Frequency", "Troop Artist"],
  ["Slow Motion", "Troop Artist"],
  ["After Hours", "Troop Artist"],
  ["Open Skies", "Troop Artist"]
];

const tracksElement = document.getElementById("tracks");
const player = document.getElementById("player");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerArt = document.getElementById("playerArt");

let currentTrack = null;

function renderTracks() {

  if (!tracksElement) return;

  tracksElement.innerHTML = tracks.map(
    ([title, artist], index) => `
      <div class="track">

        <div class="track-rank">
          ${String(index + 1).padStart(2, "0")}
        </div>

        <div class="track-main">

          <div class="track-art">
            ${String(index + 1).padStart(2, "0")}
          </div>

          <div>
            <div class="track-title">
              ${title}
            </div>

            <div class="track-artist">
              ${artist}
            </div>
          </div>

        </div>

        <button
          class="track-play"
          data-index="${index}"
          aria-label="Play ${title}"
        >
          ▶
        </button>

      </div>
    `
  ).join("");

  tracksElement
    .querySelectorAll(".track-play")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.index);

        playTrack(index);
      });

    });
}

function playTrack(index) {

  currentTrack = tracks[index];

  if (!currentTrack) return;

  playerTitle.textContent =
    currentTrack[0];

  playerArtist.textContent =
    currentTrack[1];

  playerArt.textContent =
    String(index + 1).padStart(2, "0");

  player.classList.add("active");
}

renderTracks();
