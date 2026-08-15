const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".site-header");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}


/* Scroll-aware header */

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (header) {
    header.classList.toggle("scrolled", currentScroll > 30);

    if (currentScroll > lastScroll && currentScroll > 180) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
  }

  lastScroll = currentScroll;
}, { passive: true });


/* Current year */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* Reveal animation */

const revealItems = document.querySelectorAll(
  ".feature-card, .experience-box, .about-grid, .start-box"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach(item => {
    item.classList.add("reveal");
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => {
    item.classList.add("visible");
  });
}


/* Desktop parallax */

if (
  window.matchMedia("(pointer:fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const visual = document.querySelector(".hero-visual");

  window.addEventListener("mousemove", event => {
    if (!visual) return;

    const x =
      (event.clientX / window.innerWidth - .5) * 8;

    const y =
      (event.clientY / window.innerHeight - .5) * 8;

    visual.style.transform =
      `perspective(1000px)
       rotateY(${x}deg)
       rotateX(${-y}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    if (!visual) return;

    visual.style.transform =
      "perspective(1000px) rotateY(0) rotateX(0)";
  });
}:root {
  --bg: #050608;
  --bg-2: #090b0f;
  --surface: #0d1015;
  --surface-2: #12161d;

  --text: #f5f7f1;
  --muted: #8d939d;

  --accent: #d9ff62;
  --accent-bright: #e7ff91;

  --line: rgba(255,255,255,.085);

  --container: 1180px;
  --radius: 28px;

  --ease: cubic-bezier(.16,1,.3,1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background: var(--bg);
}

body {
  min-height: 100vh;

  background:
    radial-gradient(
      circle at 75% 8%,
      rgba(217,255,98,.075),
      transparent 27%
    ),
    radial-gradient(
      circle at 5% 75%,
      rgba(88,108,255,.055),
      transparent 30%
    ),
    var(--bg);

  color: var(--text);

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  line-height: 1.6;

  overflow-x: hidden;
}

::selection {
  background: var(--accent);
  color: #050608;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}


/* ========================================
   CONTAINER
======================================== */

.container {
  width: min(
    var(--container),
    calc(100% - 48px)
  );

  margin-inline: auto;
}

.section {
  padding: 140px 0;
}

.section-label {
  display: block;

  color: var(--accent);

  font-size: .68rem;

  font-weight: 850;

  letter-spacing: .18em;

  margin-bottom: 25px;
}


/* ========================================
   HEADER
======================================== */

.site-header {
  position: fixed;

  inset: 0 0 auto;

  z-index: 1000;

  height: 78px;

  background:
    rgba(5,6,8,.64);

  border-bottom:
    1px solid var(--line);

  backdrop-filter:
    blur(22px);

  transition:
    background .35s ease,
    border-color .35s ease,
    transform .4s var(--ease);
}

.site-header.scrolled {
  background:
    rgba(5,6,8,.9);

  border-color:
    rgba(255,255,255,.13);
}

.nav {
  height: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;
}

.brand {
  position: relative;

  font-size: 1.32rem;

  font-weight: 950;

  letter-spacing: -.075em;
}

.brand span {
  color: var(--accent);
}

.nav-menu {
  display: flex;

  align-items: center;

  gap: 32px;
}

.nav-menu a {
  position: relative;

  color: var(--muted);

  font-size: .83rem;

  transition:
    color .25s ease;
}

.nav-menu a::after {
  content: "";

  position: absolute;

  left: 0;
  right: 100%;
  bottom: -7px;

  height: 1px;

  background: var(--accent);

  transition:
    right .3s var(--ease);
}

.nav-menu a:hover {
  color: var(--text);
}

.nav-menu a:hover::after {
  right: 0;
}

.nav-button {
  padding: 10px 18px;

  border-radius: 999px;

  background: var(--text);

  color: #050608 !important;

  font-weight: 850;
}

.nav-button::after {
  display: none;
}

.menu-toggle {
  display: none;

  width: 42px;
  height: 42px;

  border: 1px solid var(--line);

  border-radius: 50%;

  background: var(--surface);

  cursor: pointer;

  position: relative;
}

.menu-toggle span {
  position: absolute;

  left: 12px;

  width: 17px;
  height: 1px;

  background: var(--text);

  transition:
    transform .3s var(--ease);
}

.menu-toggle span:first-child {
  top: 16px;
}

.menu-toggle span:last-child {
  top: 23px;
}


/* ========================================
   HERO
======================================== */

.hero {
  min-height: 100svh;

  padding:
    150px 0
    100px;

  display: flex;

  align-items: center;

  position: relative;

  isolation: isolate;
}

.hero-grid {
  display: grid;

  grid-template-columns:
    minmax(0,1.04fr)
    minmax(380px,.96fr);

  gap: 80px;

  align-items: center;
}

.hero-glow {
  position: absolute;

  width: 500px;
  height: 500px;

  border-radius: 50%;

  pointer-events: none;

  filter: blur(120px);

  z-index: -1;

  transition:
    transform 1.5s var(--ease);
}

.glow-one {
  right: -200px;
  top: 60px;

  background:
    rgba(217,255,98,.18);
}

.glow-two {
  left: -300px;
  bottom: -250px;

  background:
    rgba(76,98,255,.09);
}

.eyebrow {
  display: inline-flex;

  align-items: center;

  gap: 9px;

  padding: 8px 13px;

  border:
    1px solid var(--line);

  border-radius: 999px;

  background:
    rgba(255,255,255,.025);

  color: var(--muted);

  font-size: .71rem;

  font-weight: 700;

  margin-bottom: 30px;

  animation:
    heroIn .8s var(--ease) both;
}

.status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--accent);

  box-shadow:
    0 0 18px
    rgba(217,255,98,.9);

  animation:
    pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  50% {
    opacity: .45;

    transform:
      scale(.7);
  }
}

.hero h1 {
  max-width: 900px;

  font-size:
    clamp(4rem, 8.2vw, 8rem);

  line-height: .84;

  letter-spacing: -.09em;

  font-weight: 900;

  animation:
    heroIn 1s .08s var(--ease) both;
}

.hero h1 span {
  display: block;

  color: var(--accent);

  text-shadow:
    0 0 50px
    rgba(217,255,98,.06);
}

.hero-description {
  max-width: 570px;

  margin-top: 34px;

  color: var(--muted);

  font-size:
    clamp(1rem,1.5vw,1.14rem);

  animation:
    heroIn 1s .16s var(--ease) both;
}

.hero-actions {
  display: flex;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 38px;

  animation:
    heroIn 1s .24s var(--ease) both;
}

@keyframes heroIn {
  from {
    opacity: 0;

    transform:
      translateY(25px);
  }

  to {
    opacity: 1;

    transform:
      translateY(0);
  }
}


/* ========================================
   BUTTONS
======================================== */

.button {
  min-height: 51px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 14px;

  padding:
    0 21px;

  border-radius: 999px;

  font-size: .82rem;

  font-weight: 850;

  transition:
    transform .3s var(--ease),
    box-shadow .3s ease,
    background .3s ease;
}

.button:hover {
  transform:
    translateY(-3px);
}

.button-primary {
  background:
    var(--accent);

  color: #050608;

  box-shadow:
    0 0 0
    rgba(217,255,98,0);
}

.button-primary:hover {
  background:
    var(--accent-bright);

  box-shadow:
    0 12px 35px
    rgba(217,255,98,.14);
}

.button-ghost {
  border:
    1px solid var(--line);

  background:
    rgba(255,255,255,.025);
}

.button-ghost:hover {
  background:
    var(--surface-2);
}


/* ========================================
   HERO VISUAL
======================================== */

.hero-visual {
  min-height: 540px;

  position: relative;

  overflow: hidden;

  border:
    1px solid var(--line);

  border-radius: 38px;

  background:
    radial-gradient(
      circle at 50% 45%,
      rgba(217,255,98,.075),
      transparent 35%
    ),
    linear-gradient(
      145deg,
      rgba(255,255,255,.045),
      transparent 55%
    ),
    var(--surface);

  box-shadow:
    0 60px 130px
    rgba(0,0,0,.4);

  animation:
    heroVisualIn 1.2s .1s var(--ease) both;
}

@keyframes heroVisualIn {
  from {
    opacity: 0;

    transform:
      scale(.94)
      translateY(25px);
  }

  to {
    opacity: 1;

    transform:
      scale(1)
      translateY(0);
  }
}

.hero-visual::before {
  content: "";

  position: absolute;

  inset: 0;

  background-image:
    linear-gradient(
      rgba(255,255,255,.025) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255,255,255,.025) 1px,
      transparent 1px
    );

  background-size:
    45px 45px;

  mask-image:
    radial-gradient(
      circle,
      black,
      transparent 72%
    );

  opacity: .5;
}

.visual-orbit {
  position: absolute;

  left: 50%;
  top: 50%;

  transform:
    translate(-50%,-50%);

  border:
    1px solid
    rgba(217,255,98,.14);

  border-radius: 50%;
}

.orbit-one {
  width: 290px;
  height: 290px;

  animation:
    orbit 16s linear infinite;
}

.orbit-two {
  width: 430px;
  height: 430px;

  border-color:
    rgba(255,255,255,.055);

  animation:
    orbitReverse 23s linear infinite;
}

@keyframes orbit {
  to {
    transform:
      translate(-50%,-50%)
      rotate(360deg);
  }
}

@keyframes orbitReverse {
  to {
    transform:
      translate(-50%,-50%)
      rotate(-360deg);
  }
}

.visual-core {
  position: absolute;

  left: 50%;
  top: 50%;

  width: 165px;
  height: 165px;

  transform:
    translate(-50%,-50%);

  border-radius: 50%;

  display: grid;

  place-items: center;

  background:
    var(--accent);

  box-shadow:
    0 0 90px
    rgba(217,255,98,.25);

  animation:
    coreFloat 5s ease-in-out infinite;
}

@keyframes coreFloat {
  50% {
    transform:
      translate(-50%,-54%);
  }
}

.core-inner {
  width: 132px;
  height: 132px;

  display: grid;

  place-items: center;

  border-radius: 50%;

  background:
    #0b0d0b;

  border:
    1px solid
    rgba(255,255,255,.08);
}

.core-inner span {
  color: var(--accent);

  font-size: 4.2rem;

  font-weight: 950;

  letter-spacing: -.12em;
}

.floating-card {
  position: absolute;

  padding:
    17px 19px;

  border:
    1px solid
    rgba(255,255,255,.1);

  border-radius: 17px;

  background:
    rgba(8,10,12,.76);

  backdrop-filter:
    blur(18px);

  box-shadow:
    0 25px 60px
    rgba(0,0,0,.28);

  z-index: 3;
}

.floating-card small {
  display: block;

  margin-bottom: 6px;

  color: var(--muted);

  font-size: .6rem;

  font-weight: 800;

  letter-spacing: .15em;
}

.floating-card strong {
  display: block;

  font-size: .88rem;

  line-height: 1.2;
}

.card-top {
  right: 28px;
  top: 30px;

  animation:
    float 5s ease-in-out infinite;
}

.card-bottom {
  left: 28px;
  bottom: 28px;

  animation:
    float 6s ease-in-out infinite reverse;
}

@keyframes float {
  50% {
    transform:
      translateY(-9px);
  }
}


/* ========================================
   SECTION HEAD
======================================== */

.section-heading {
  display: grid;

  grid-template-columns:
    1fr 400px;

  gap: 60px;

  align-items: end;

  margin-bottom: 55px;
}

.section-heading h2,
.about h2 {
  font-size:
    clamp(3rem,6vw,5.7rem);

  line-height: .88;

  letter-spacing: -.075em;
}

.section-heading h2 span,
.about h2 span,
.experience-box h2 span,
.start-box h2 span {
  color: var(--accent);
}

.section-heading > p {
  color: var(--muted);

  font-size: .96rem;
}


/* ========================================
   FEATURE GRID
======================================== */

.feature-grid {
  display: grid;

  grid-template-columns:
    1.4fr 1fr 1fr;

  gap: 15px;
}

.feature-card {
  min-height: 390px;

  padding: 30px;

  display: flex;

  flex-direction: column;

  justify-content: space-between;

  border:
    1px solid var(--line);

  border-radius:
    var(--radius);

  background:
    var(--surface);

  transition:
    transform .5s var(--ease),
    border-color .4s ease,
    background .4s ease;
}

.feature-card:hover {
  transform:
    translateY(-8px);

  border-color:
    rgba(217,255,98,.28);

  background:
    var(--surface-2);
}

.feature-number {
  color: var(--accent);

  font-size: .67rem;

  font-weight: 900;

  letter-spacing: .15em;
}

.feature-content h3 {
  font-size: 2rem;

  line-height: 1;

  letter-spacing: -.055em;

  margin-bottom: 13px;
}

.feature-content p {
  max-width: 330px;

  color: var(--muted);

  font-size: .9rem;
}

.feature-link {
  display: inline-flex;

  gap: 10px;

  margin-top: 25px;

  font-size: .8rem;

  font-weight: 850;
}

.feature-link span {
  color: var(--accent);
}


/* ========================================
   EXPERIENCE
======================================== */

.experience-box {
  min-height: 650px;

  position: relative;

  overflow: hidden;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: flex-start;

  padding:
    clamp(45px,8vw,100px);

  border:
    1px solid var(--line);

  border-radius: 36px;

  background:
    radial-gradient(
      circle at 72% 40%,
      rgba(217,255,98,.12),
      transparent 35%
    ),
    var(--surface);
}

.experience-box::before {
  content: "";

  position: absolute;

  width: 500px;
  height: 500px;

  right: -230px;
  bottom: -230px;

  border:
    1px solid
    rgba(217,255,98,.18);

  border-radius: 50%;

  box-shadow:
    0 0 0 80px
    rgba(217,255,98,.015),
    0 0 0 160px
    rgba(217,255,98,.01);
}

.experience-label {
  margin-bottom: 25px;

  color: var(--accent);

  font-size: .68rem;

  font-weight: 850;

  letter-spacing: .17em;
}

.experience-box h2 {
  font-size:
    clamp(3.3rem,7vw,7rem);

  line-height: .86;

  letter-spacing: -.085em;
}

.experience-box p {
  max-width: 500px;

  margin:
    30px 0;

  color: var(--muted);
}


/* ========================================
   ABOUT
======================================== */

.about-grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 100px;
}

.about-copy {
  padding-top: 55px;
}

.about-copy p {
  max-width: 540px;

  margin-bottom: 25px;

  color: var(--muted);

  font-size:
    clamp(1.05rem,1.8vw,1.3rem);
}


/* ========================================
   START
======================================== */

.start-box {
  padding:
    clamp(45px,8vw,100px);

  text-align: center;

  border:
    1px solid var(--line);

  border-radius: 36px;

  background:
    linear-gradient(
      145deg,
      rgba(217,255,98,.09),
      rgba(255,255,255,.025)
    );
}

.start-box h2 {
  font-size:
    clamp(3.3rem,7vw,7rem);

  line-height: .88;

  letter-spacing: -.085em;
}

.start-box p {
  margin:
    25px 0 30px;

  color: var(--muted);
}


/* ========================================
   FOOTER
======================================== */

footer {
  padding: 35px 0;

  border-top:
    1px solid var(--line);
}

.footer-inner {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;
}

.footer-inner p {
  color: var(--muted);

  font-size: .75rem;
}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 900px) {

  .hero-grid {
    grid-template-columns: 1fr;

    gap: 60px;
  }

  .section-heading {
    grid-template-columns: 1fr;

    gap: 25px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    min-height: 310px;
  }

  .about-grid {
    grid-template-columns: 1fr;

    gap: 30px;
  }

  .about-copy {
    padding-top: 0;
  }
}


@media (max-width: 700px) {

  .container {
    width:
      min(
        var(--container),
        calc(100% - 30px)
      );
  }

  .site-header {
    height: 70px;
  }

  .nav-menu {
    display: none;

    position: absolute;

    top: 82px;

    left: 15px;
    right: 15px;

    flex-direction: column;

    align-items: stretch;

    gap: 4px;

    padding: 18px;

    border:
      1px solid var(--line);

    border-radius: 22px;

    background:
      rgba(10,12,15,.97);

    box-shadow:
      0 30px 90px
      rgba(0,0,0,.5);
  }

  .nav-menu.active {
    display: flex;

    animation:
      menuIn .35s var(--ease) both;
  }

  @keyframes menuIn {
    from {
      opacity: 0;
      transform:
        translateY(-10px)
        scale(.98);
    }

    to {
      opacity: 1;
      transform:
        translateY(0)
        scale(1);
    }
  }

  .nav-menu a {
    padding: 12px;
  }

  .nav-button {
    text-align: center;
  }

  .menu-toggle {
    display: block;
  }

  .hero {
    padding-top: 120px;
  }

  .hero h1 {
    font-size:
      clamp(3.6rem,17vw,6rem);
  }

  .hero-visual {
    min-height: 390px;

    border-radius: 28px;
  }

  .visual-core {
    width: 125px;
    height: 125px;
  }

  .core-inner {
    width: 100px;
    height: 100px;
  }

  .core-inner span {
    font-size: 3.1rem;
  }

  .orbit-one {
    width: 230px;
    height: 230px;
  }

  .orbit-two {
    width: 330px;
    height: 330px;
  }

  .section {
    padding: 90px 0;
  }

  .experience-box {
    min-height: 500px;

    border-radius: 28px;
  }

  .footer-inner {
    flex-direction: column;

    align-items: flex-start;
  }
}


@media (max-width: 420px) {

  .hero-actions {
    flex-direction: column;
  }

  .button {
    width: 100%;
  }

  .hero-visual {
    min-height: 330px;
  }

  .floating-card {
    padding: 13px;
  }

  .floating-card strong {
    font-size: .75rem;
  }

  .section-heading h2,
  .about h2 {
    font-size: 3.2rem;
  }
}


/* ========================================
   REDUCED MOTION
======================================== */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;

    animation-iteration-count: 1 !important;

    scroll-behavior: auto !important;

    transition-duration: .01ms !important;
  }
}const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll(
    ".feature-card, .experience-box, .about-grid, .start-box"
  )
  .forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });

const style = document.createElement("style");

style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(25px);
    transition:
      opacity .8s cubic-bezier(.2,.8,.2,1),
      transform .8s cubic-bezier(.2,.8,.2,1);
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

