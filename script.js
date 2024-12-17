// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navLinksAnchors = document.querySelectorAll(".nav-links a");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Close mobile menu when clicking nav links
  navLinksAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Smooth scroll with offset for header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        const headerOffset = document.querySelector("header").offsetHeight;
        const targetPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          targetPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll hide/show
  let lastScroll = 0;
  let isScrolling;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    window.clearTimeout(isScrolling);

    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScroll = currentScroll;

    isScrolling = setTimeout(() => {
      if (currentScroll <= 100) {
        header.classList.remove("hidden");
      }
    }, 150);
  });

  // Initialize animations
  initAnimations();
});

function initAnimations() {
  // Set initial states
  gsap.set(
    [
      ".about h2",
      ".about-text",
      ".about-features",
      ".feature",
      ".services-header",
      ".service-card",
      ".contact-header",
      ".locations",
      ".contact-form",
      ".form-group",
    ],
    {
      opacity: 0,
      y: 50,
    }
  );

  gsap.set(".hero-content", {
    opacity: 0,
    y: 30,
  });

  gsap.set(".locations", {
    x: -50,
  });

  gsap.set(".contact-form", {
    x: 50,
  });

  // Hero animations
  const heroTL = gsap.timeline({});
  heroTL
    .to(".hero-content", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(
      ".hero-content h1",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".hero-description",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".hero-buttons",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

  // About section animations
  gsap.to(".about h2", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.to(".about-text", {
    scrollTrigger: {
      trigger: ".about-text",
      start: "top 80%",
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  });

  // About features animations
  const featuresTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-features",
      start: "top 80%",
      once: true,
    },
  });

  featuresTL
    .to(".about-features", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .to(
      ".feature",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.4"
    );

  // Services section animations
  const servicesTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".services",
      start: "top 80%",
      once: true,
    },
  });

  servicesTL
    .to(".services-header", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(
      ".service-card",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5"
    );

  // Contact section animations
  const contactTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%",
      once: true,
    },
  });

  contactTL
    .to(".contact-header", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(
      ".locations",
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".contact-form",
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".form-group",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.3"
    );

  // Animate geometric shapes
  const shapes = gsap.utils.toArray(".shape");
  shapes.forEach((shape, i) => {
    gsap.to(shape, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.2,
    });

    // Add parallax effect to shapes
    gsap.to(shape, {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      y: "random(100, 200)",
      ease: "none",
    });
  });
}

// Cleanup function
function cleanup() {
  // Kill all GSAP animations
  gsap.killAll();

  // Remove scroll event listeners
  window.removeEventListener("scroll", () => {});

  // Remove click event listeners
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.removeEventListener("click", () => {});
  });
}

// Export cleanup function
window.cleanupAnimations = cleanup;