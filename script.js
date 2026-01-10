// DOM Ready
document.addEventListener("DOMReady", () => {
  initApp();
});

function initApp() {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

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

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-level");

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

  // Animate metrics counting
  const metricValues = document.querySelectorAll(".metric-value[data-count]");

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

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.background = "#10b981";

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
        }, 3000);
      }, 1500);
    });
  }

  // Update current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll effect to navbar
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.boxShadow = "none";
      return;
    }

    if (currentScroll > lastScroll) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
      navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
    }

    lastScroll = currentScroll;
  });
}

// Counter animation function
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50; // 50 steps
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

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Add parallax effect to background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  document.querySelector(
    ".animated-bg"
  ).style.transform = `translate3d(0, ${rate}px, 0)`;
});
