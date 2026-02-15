document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main .card");
  const navLinks = document.querySelectorAll("nav a");
  const backToTopBtn = document.getElementById("back-to-top");
  const themeToggle = document.getElementById("theme-toggle");

  // ===== MENU MOBILE =====
  const navToggle = document.getElementById("nav-toggle");
  const navLinksBox = document.getElementById("nav-links");

  const closeMenu = () => {
    if (!navLinksBox || !navToggle) return;
    navLinksBox.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "☰";
  };

  const openMenu = () => {
    if (!navLinksBox || !navToggle) return;
    navLinksBox.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.textContent = "✕";
  };

  if (navToggle && navLinksBox) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinksBox.classList.contains("open");
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Fecha o menu ao clicar em um link no mobile
    navLinksBox.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });

    // Fecha o menu ao clicar fora (mobile)
    document.addEventListener("click", (e) => {
      if (window.innerWidth > 768) return;
      if (!navLinksBox.classList.contains("open")) return;
      const clickedInsideMenu = navLinksBox.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInsideMenu) closeMenu();
    });

    // Fecha o menu se redimensionar para desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // ===== BACK TO TOP (inicia escondido) =====
  if (backToTopBtn) {
    backToTopBtn.style.display = "none";
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== DARK MODE (salva preferência) =====
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ===== ANIMAÇÃO DOS CARDS =====
  // Segurança: deixa todos visíveis por padrão
  sections.forEach((section) => section.classList.add("visible"));

  // Se o navegador suportar, ativa efeito ao aparecer (opcional)
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // ===== MENU ATIVO + BACK TO TOP =====
  const onScroll = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    if (backToTopBtn) {
      backToTopBtn.style.display = window.scrollY > 350 ? "flex" : "none";
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // roda uma vez ao carregar
});
