/* ============================================
CONFIG: Налаштування
============================================ */
(function () {
  const CONFIG = {
    heroHeadline: {
      headingLevel: "h1", // ЗМІНИТИ на "h2" якщо блок НЕ перший на сторінці
    },
    video: {
      src: "assets/hero.mp4",
      poster: "assets/hero-poster.jpg",
    },
    phone: "+380501234567",
    instagram: "luna.nails",
    telegram: "luna_nails",
  };

  /* ============================================
 ESC — закрити меню
============================================ */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ============================================
 BURGER MENU
============================================ */
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function openMenu() {
    burgerBtn.classList.add("active");
    burgerBtn.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("open");
    document.body.classList.add("menu-open");
    // Focus trap: first link
    mobileMenu.querySelector("a")?.focus();
  }

  function closeMenu() {
    burgerBtn.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Close on nav link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // Close on outside click (поза меню)
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("open") &&
      !mobileMenu.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ============================================
 NAVBAR SCROLL
============================================ */
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      lastScroll = scrollY;
    },
    { passive: true },
  );

  /* ============================================
 HERO ENTRANCE ANIMATION
============================================ */
  function heroEntrance() {
    // 1. Background already visible via CSS

    // 2. Badge
    setTimeout(() => {
      document.getElementById("heroBadge")?.classList.add("visible");
    }, 300);

    // 3. Word-by-word heading reveal
    const words = document.querySelectorAll(".hero__word-inner");
    words.forEach((w, i) => {
      setTimeout(() => w.classList.add("revealed"), 500 + i * 150);
    });

    // 4. Services strip
    setTimeout(() => {
      document.getElementById("heroStrip")?.classList.add("visible");
    }, 1100);

    // 5. CTAs
    setTimeout(() => {
      document.getElementById("heroCtas")?.classList.add("visible");
    }, 1400);

    // 6. Floats
    setTimeout(() => {
      document.getElementById("heroFloats")?.classList.add("visible");
    }, 1700);

    // 7. Scroll indicator
    setTimeout(() => {
      document.getElementById("heroScroll")?.classList.add("visible");
    }, 2000);
  }

  // Run on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", heroEntrance);
  } else {
    heroEntrance();
  }
   
  /* ============================================
  SCROLL REVEAL
  ============================================ */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // Swipe support
  let touchStartX = 0;
  track?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  track?.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  });

  /* ============================================
 PARALLAX HERO IMAGE (lightweight)
============================================ */
  const heroBgImg = document.querySelector(".hero__bg-img");
  if (
    heroBgImg &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroBgImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      },
      { passive: true },
    );
  }
})();
