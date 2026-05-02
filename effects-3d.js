/* ══════════════════════════════════════════════
   ATHAR — 3D Effects: Hero Parallax, Logo 3D, Card Tilt, 3D Text
══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════
     1. HERO PARALLAX LAYERS
  ══════════════════════════════ */
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroBg      = hero.querySelector('.hero-bg');
    const logoWrap    = hero.querySelector('.hero-logo-img');
    const tagline     = hero.querySelector('.hero-tagline');
    const arabicLine  = hero.querySelector('.hero-arabic');
    const subLine     = hero.querySelector('.hero-sub');
    const btns        = hero.querySelector('.hero-btns');
    const scrollLine  = hero.querySelector('.hero-scroll');

    let mx = 0, my = 0;
    let cx = 0, cy = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;  // -1 to 1
      my = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    });

    hero.addEventListener('mouseleave', () => {
      mx = 0; my = 0;
    });

    function tick() {
      // Smooth lerp
      cx += (mx - cx) * 0.055;
      cy += (my - cy) * 0.055;

      if (heroBg) {
        heroBg.style.transform = `scale(1.05) translate(${cx * -12}px, ${cy * -10}px)`;
      }
      if (logoWrap) {
        logoWrap.style.transform = `translate(${cx * 18}px, ${cy * 14}px) rotateY(${cx * 6}deg) rotateX(${-cy * 4}deg)`;
      }
      if (tagline) {
        tagline.style.transform = `translate(${cx * 10}px, ${cy * 8}px)`;
      }
      if (arabicLine) {
        arabicLine.style.transform = `translate(${cx * 7}px, ${cy * 5}px)`;
      }
      if (subLine) {
        subLine.style.transform = `translate(${cx * 5}px, ${cy * 3}px)`;
      }
      if (btns) {
        btns.style.transform = `translate(${cx * 4}px, ${cy * 3}px)`;
      }
      if (scrollLine) {
        scrollLine.style.transform = `translateX(calc(-50% + ${cx * 3}px))`;
      }

      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ══════════════════════════════
     2. 3D ROTATING HERO LOGO
  ══════════════════════════════ */
  function initLogoRotation() {
    const logoWrap = document.querySelector('.hero-logo-img');
    const logoImg  = logoWrap ? logoWrap.querySelector('img') : null;
    if (!logoImg) return;

    // Wrap in a 3D stage
    const stage = document.createElement('div');
    stage.className = 'logo-3d-stage';
    logoImg.parentNode.insertBefore(stage, logoImg);
    stage.appendChild(logoImg);

    // Glow halo behind logo
    const halo = document.createElement('div');
    halo.className = 'logo-3d-halo';
    stage.appendChild(halo);

    // Idle bobbing
    let idleT = 0;
    let lastScroll = -1;

    function bobLoop() {
      idleT += 0.016;
      // Only apply idle when not being parallaxed by mouse (we just layer on top)
      const bobY = Math.sin(idleT * 0.9) * 5;
      const bobRot = Math.sin(idleT * 0.5) * 2;
      stage.style.setProperty('--bob-y', `${bobY}px`);
      stage.style.setProperty('--bob-rot', `${bobRot}deg`);
      requestAnimationFrame(bobLoop);
    }
    bobLoop();
  }

  /* ══════════════════════════════
     3. 3D TEXT DEPTH — HERO TAGLINE
  ══════════════════════════════ */
  function init3DText() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    // Build layered text-shadow via CSS variable updated on mouse
    const hero = document.querySelector('.hero');

    function updateTextDepth(mx, my) {
      const dx = mx * 6;
      const dy = my * 6;
      // 5-layer stack for thick 3D feel
      const shadows = [
        `${dx * 0.2}px ${dy * 0.2}px 0px rgba(92,61,30,0.5)`,
        `${dx * 0.4}px ${dy * 0.4}px 0px rgba(92,61,30,0.4)`,
        `${dx * 0.6}px ${dy * 0.6}px 0px rgba(46,26,14,0.35)`,
        `${dx * 0.8}px ${dy * 0.8}px 2px rgba(46,26,14,0.25)`,
        `${dx * 1.0}px ${dy * 1.0}px 8px rgba(0,0,0,0.3)`,
        `0 0 30px rgba(184,146,74,0.2)`,
      ].join(', ');

      tagline.style.textShadow = shadows;
    }

    // Default resting shadow
    updateTextDepth(0.3, 0.5);

    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        const my = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
        updateTextDepth(mx, my);
      });
      hero.addEventListener('mouseleave', () => updateTextDepth(0.3, 0.5));
    }

    // Also apply to hero arabic text
    const arabicEl = document.querySelector('.hero-arabic');
    if (arabicEl) {
      arabicEl.style.textShadow = '0 2px 12px rgba(0,0,0,0.4), 0 0 20px rgba(184,146,74,0.15)';
    }

    // Hero section label 3D treatment
    const heroSub = document.querySelector('.hero-sub');
    if (heroSub) {
      heroSub.style.textShadow = '0 1px 6px rgba(0,0,0,0.5)';
    }
  }

  /* ══════════════════════════════
     4. 3D CARD TILT ON HOVER
  ══════════════════════════════ */
  function applyCardTilt(card) {
    let isHovering = false;
    let rafId = null;
    let targetRx = 0, targetRy = 0;
    let currentRx = 0, currentRy = 0;
    let targetShineX = 50, targetShineY = 50;

    // Create shine overlay
    const shine = document.createElement('div');
    shine.className = 'card-tilt-shine';
    card.appendChild(shine);

    // Add depth class
    card.classList.add('card-3d');

    card.addEventListener('mouseenter', () => {
      isHovering = true;
      startLoop();
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0 to 1
      const y = (e.clientY - rect.top)  / rect.height;  // 0 to 1

      const MAX_TILT = 14;
      targetRy =  (x - 0.5) * MAX_TILT * 2;   // left-right rotation
      targetRx = -(y - 0.5) * MAX_TILT * 2;   // up-down rotation

      // Shine position
      targetShineX = x * 100;
      targetShineY = y * 100;
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRx = 0;
      targetRy = 0;
      targetShineX = 50;
      targetShineY = 50;
    });

    function startLoop() {
      if (rafId) return;
      function loop() {
        currentRx += (targetRx - currentRx) * 0.12;
        currentRy += (targetRy - currentRy) * 0.12;

        card.style.transform = `
          perspective(700px)
          rotateX(${currentRx}deg)
          rotateY(${currentRy}deg)
          translateZ(${isHovering ? 8 : 0}px)
          scale(${isHovering ? 1.03 : 1})
        `;

        // Specular / shine overlay
        const shineOpacity = isHovering
          ? 0.12 + Math.abs(currentRx + currentRy) * 0.003
          : 0;
        shine.style.background = `radial-gradient(
          circle at ${targetShineX}% ${targetShineY}%,
          rgba(255,245,210,0.55) 0%,
          rgba(184,146,74,0.15) 35%,
          transparent 65%
        )`;
        shine.style.opacity = String(shineOpacity * 8);

        if (isHovering || Math.abs(currentRx) > 0.05 || Math.abs(currentRy) > 0.05) {
          rafId = requestAnimationFrame(loop);
        } else {
          // Snap to rest
          currentRx = 0; currentRy = 0;
          card.style.transform = '';
          shine.style.opacity = '0';
          rafId = null;
        }
      }
      rafId = requestAnimationFrame(loop);
    }
  }

  function initCardTilt() {
    // Apply to existing cards
    document.querySelectorAll('.menu-card').forEach(applyCardTilt);

    // Watch for new cards added dynamically (tab switching re-renders the grid)
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const observer = new MutationObserver(() => {
      grid.querySelectorAll('.menu-card:not(.card-3d)').forEach(applyCardTilt);
    });
    observer.observe(grid, { childList: true, subtree: false });
  }

  /* ══════════════════════════════
     5. SECTION SCROLL 3D DEPTH
  ══════════════════════════════ */
  function initScrollDepth() {
    // Featured section — subtle parallax on the logo rings
    const rings = document.querySelectorAll('.logo-ring');
    const featuredLogo = document.querySelector('.featured-logo-animated');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;

      rings.forEach((ring, i) => {
        const offset = scrollY * (i === 0 ? 0.04 : -0.03);
        ring.style.transform = ring.style.transform || '';
        ring.setAttribute('data-scroll-offset', offset);
      });

      // Featured section depth
      const featured = document.querySelector('.featured-section');
      if (featured) {
        const rect = featured.getBoundingClientRect();
        const progress = 1 - (rect.top + rect.height * 0.5) / (winH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const depth = (clamped - 0.5) * 30;
        if (featuredLogo) {
          featuredLogo.style.transform = `translateY(${-depth * 0.3}px) scale(${1 + clamped * 0.05})`;
        }
      }
    }, { passive: true });
  }

  /* ══════════════════════════════
     INIT ALL
  ══════════════════════════════ */
  function init() {
    initHeroParallax();
    initLogoRotation();
    init3DText();
    initScrollDepth();

    // Card tilt — init once menu is rendered
    // MutationObserver in initCardTilt handles dynamic cards
    initCardTilt();
    // Also retry after a brief delay for first render
    setTimeout(initCardTilt, 800);
    setTimeout(initCardTilt, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
