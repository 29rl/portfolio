// Detect mobile devices
const isMobile = window.matchMedia("(max-width: 768px)").matches;

function initApp() {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("active");
      });
    });
  }

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-level");

  if (skillBars.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillLevel = entry.target;
            const percentage = skillLevel.getAttribute("data-level");
            skillLevel.style.setProperty("--width", percentage + "%");
            skillLevel.style.animationDelay = "0.5s";
            observer.unobserve(skillLevel);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => observer.observe(bar));
  }

  // Animate metrics counting
  const metricValues = document.querySelectorAll(".metric-value[data-count]");

  if (metricValues.length > 0) {
    const metricsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const metric = entry.target;
            const target = parseInt(metric.getAttribute("data-count"));
            animateCounter(metric, target);
            metricsObserver.unobserve(metric);
          }
        });
      },
      { threshold: 0.5 }
    );

    metricValues.forEach((metric) => metricsObserver.observe(metric));
  }

  // Update year
  const year = document.getElementById("currentYear");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Project card hover — desktop only
  if (!isMobile) {
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll behavior — desktop only
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");

  if (navbar && !isMobile) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.style.boxShadow = "none";
        return;
      }

      if (currentScroll > lastScroll) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
        navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
      }

      lastScroll = currentScroll;
    });
  }
}

// Counter animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent =
        target + (element.textContent.includes("%") ? "%" : "");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current) + (element.textContent.includes("%") ? "%" : "");
    }
  }, 30);
}

// Safe DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Parallax background — desktop only
const bg = document.querySelector(".animated-bg");
if (bg && !isMobile) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    bg.style.transform = `translate3d(0, ${rate}px, 0)`;
  });
}
