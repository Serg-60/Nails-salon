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

      // Close on outside click
      mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) closeMenu();
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
     VIDEO HERO (розкоментуй якщо є відео)
  ============================================ */
      /*
  const video = document.getElementById('heroVideo');
  if (video) {
    video.addEventListener('canplay', () => {
      video.classList.add('loaded');
    });
    // Fallback
    setTimeout(() => video.classList.add('loaded'), 1500);
  }
  */

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

      /* ============================================
     TESTIMONIALS SLIDER
  ============================================ */
      // const track = document.getElementById("testTrack");
      // const dots = document.querySelectorAll(".t-dot");
      // const cards = track ? track.querySelectorAll(".testimonial-card") : [];
      // let current = 0;

      // function goTo(idx) {
      //   current = (idx + cards.length) % cards.length;
      //   if (track) track.style.transform = `translateX(-${current * 100}%)`;
      //   dots.forEach((d, i) => {
      //     d.classList.toggle("active", i === current);
      //     d.setAttribute("aria-current", i === current ? "true" : "false");
      //   });
      // }

      // document
      //   .getElementById("tPrev")
      //   ?.addEventListener("click", () => goTo(current - 1));
      // document
      //   .getElementById("tNext")
      //   ?.addEventListener("click", () => goTo(current + 1));
      // dots.forEach((d) =>
      //   d.addEventListener("click", () => goTo(+d.dataset.idx)),
      // );

      // Auto-advance
      let autoSlide = setInterval(() => goTo(current + 1), 5000);
      track?.addEventListener("mouseenter", () => clearInterval(autoSlide));
      track?.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => goTo(current + 1), 5000);
      });

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
