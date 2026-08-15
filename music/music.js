const tracks = [
  {
    title: "Troophy Intro",
    artist: "Troophy",
    art: "01"
  },
  {
    title: "Night Drive",
    artist: "Troop Artist",
    art: "02"
  },
  {
    title: "Afterlight",
    artist: "Troop Artist",
    art: "03"
  },
  {
    title: "New Perspective",
    artist: "Troop Artist",
    art: "04"
  },
  {
    title: "Midnight Signal",
    artist: "Troop Artist",
    art: "05"
  },
  {
    title: "Parallel",
    artist: "Troop Artist",
    art: "06"
  },
  {
    title: "Frequency",
    artist: "Troop Artist",
    art: "07"
  },
  {
    title: "Slow Motion",
    artist: "Troop Artist",
    art: "08"
  },
  {
    title: "After Hours",
    artist: "Troop Artist",
    art: "09"
  },
  {
    title: "Open Skies",
    artist: "Troop Artist",
    art: "10"
  }
];

const tracksElement =
  document.getElementById("tracks");

const player =
  document.getElementById("player");

const playerTitle =
  document.getElementById("playerTitle");

const playerArtist =
  document.getElementById("playerArtist");

const playerArt =
  document.getElementById("playerArt");

let currentTrack = null;

function renderTracks() {

  tracksElement.innerHTML = "";

  tracks.forEach((track, index) => {

    const row =
      document.createElement("div");

    row.className = "track";

    row.innerHTML = `
      <div class="track-rank">
        ${String(index + 1).padStart(2, "0")}
      </div>

      <div class="track-main">

        <div class="track-art">
          ${track.art}
        </div>

        <div>
          <div class="track-title">
            ${track.title}
          </div>

          <div class="track-artist">
            ${track.artist}
          </div>
        </div>

      </div>

      <button
        class="track-play"
        aria-label="Play ${track.title}"
      >
        ▶
      </button>
    `;

    row
      .querySelector(".track-play")
      .addEventListener("click", () => {
        playTrack(track);
      });

    tracksElement.appendChild(row);
  });
}

function playTrack(track) {

  currentTrack = track;

  playerTitle.textContent =
    track.title;

  playerArtist.textContent =
    track.artist;

  playerArt.textContent =
    track.art;

  player.classList.add("active");
}

document
  .getElementById("playerButton")
  .addEventListener("click", () => {

    if (!currentTrack) return;

    alert(
      "Audio playback will be connected in the next Troop Board phase."
    );
  });

renderTracks();
