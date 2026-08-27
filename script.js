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
            /* ── Certificates slider ── */
      
        const track = document.getElementById("certTrack");
        const dotsWrap = document.getElementById("certDots");
        if (!track) return;

        const cards = track.querySelectorAll(".cert-card");
        const total = cards.length;

        // How many cards visible at once
        function perView() {
          if (window.innerWidth <= 560) return 1;
          if (window.innerWidth <= 900) return 2;
          return 3;
        }

        let cur = 0;

        // Build dots
        function buildDots() {
          dotsWrap.innerHTML = "";
          const pages = Math.ceil(total / perView());
          for (let i = 0; i < pages; i++) {
            const btn = document.createElement("button");
            btn.className = "t-dot" + (i === 0 ? " active" : "");
            btn.setAttribute("role", "listitem");
            btn.setAttribute("aria-label", "Сторінка " + (i + 1));
            btn.dataset.idx = i;
            btn.addEventListener("click", () => goTo(i));
            dotsWrap.appendChild(btn);
          }
        }

        function goTo(page) {
          const pv = perView();
          const pages = Math.ceil(total / pv);
          cur = Math.max(0, Math.min(page, pages - 1));

          // Card width + gap
          const cardEl = cards[0];
          const gap = 20;
          const cardW = cardEl.getBoundingClientRect().width + gap;
          track.style.transform = `translateX(-${cur * pv * cardW}px)`;

          dotsWrap.querySelectorAll(".t-dot").forEach((d, i) => {
            d.classList.toggle("active", i === cur);
            d.setAttribute("aria-current", i === cur ? "true" : "false");
          });
        }

        document.getElementById("certPrev").addEventListener("click", () => {
          goTo(cur - 1);
        });
        document.getElementById("certNext").addEventListener("click", () => {
          goTo(cur + 1);
        });

        // Swipe
        let startX = 0;
        track.addEventListener(
          "touchstart",
          (e) => {
            startX = e.touches[0].clientX;
          },
          { passive: true },
        );
        track.addEventListener("touchend", (e) => {
          const diff = startX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) goTo(cur + (diff > 0 ? 1 : -1));
        });

        buildDots();
        window.addEventListener("resize", () => {
          buildDots();
          goTo(0);
        });
      })();