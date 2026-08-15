const menuToggle = document.getElementById("menuToggle");
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

