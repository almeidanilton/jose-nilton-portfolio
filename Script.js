document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll("main .card");
  const navLinks = document.querySelectorAll("nav a");
  const backToTopBtn = document.getElementById("back-to-top");
  const themeToggle = document.getElementById("theme-toggle");

  // ===== MENU  =====
  const navToggle = document.getElementById("nav-toggle");
  const navLinksBox = document.getElementById("nav-links");

  if (navToggle && navLinksBox) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinksBox.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Fecha o menu ao clicar em um link no mobile
    navLinksBox.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navLinksBox.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.textContent = "☰";
        }
      });
    });
  }

  /* ===== Animação ao aparecer ===== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));

  /* ===== Menu ativo ao rolar ===== */
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Back to top
    if (backToTopBtn) {
      backToTopBtn.style.display = window.scrollY > 350 ? "block" : "none";
    }
  });

  /* ===== Voltar ao topo ===== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== Dark mode ===== */
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
  }
});