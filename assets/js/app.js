document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const header = document.querySelector(".site-header");

  /* Mobile navigation */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  /* Header */
  if (header) {
    const updateHeader = () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true
    });
  }

  /* Current year */
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* Reveal animations */
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

  /* Desktop hero movement */
  const visual = document.querySelector(".hero-visual");

  if (
    visual &&
    window.matchMedia("(pointer:fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 5;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 5;

      visual.style.transform =
        `perspective(1200px)
         rotateY(${x}deg)
         rotateX(${-y}deg)`;
    });

    document.addEventListener("mouseleave", () => {
      visual.style.transform =
        "perspective(1200px) rotateY(0deg) rotateX(0deg)";
    });
  }

});
