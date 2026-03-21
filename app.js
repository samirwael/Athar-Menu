/* ============================================
   ATHAR CAFÉ — app.js
   Simple menu: filter tabs + scroll reveal
   ============================================ */

(function () {
  'use strict';

  // ─── FILTER TABS ─────────────────────────────
  const filterTabs = document.getElementById('filterTabs');
  const menuGrid   = document.getElementById('menuGrid');

  if (filterTabs && menuGrid) {
    filterTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab');
      if (!btn) return;

      // Update active tab
      filterTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      const cat   = btn.dataset.cat;
      const cards = menuGrid.querySelectorAll('.card');

      cards.forEach((card, i) => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !match);

        if (match) {
          // Re-trigger fade-in animation
          card.style.animationDelay = `${i * 0.04}s`;
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        }
      });
    });
  }

  // ─── SCROLL REVEAL ───────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .about-inner, .section-header').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity .55s ease ${i * 0.04}s, transform .55s ease ${i * 0.04}s`;
    observer.observe(el);
  });

  // ─── CIRCULAR BEAN TEXT ──────────────────────
  const beanText = document.querySelector('.bean-text');
  if (beanText) {
    const radius = 70;
    const text   = 'ATHAR · CAFÉ · EST · 2020 · ';
    const chars  = text.split('');
    const angle  = 360 / chars.length;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-100 -100 200 200');
    svg.setAttribute('width', '160');
    svg.setAttribute('height', '160');
    svg.style.cssText = 'position:absolute;bottom:20px;right:20px;animation:spin 18s linear infinite;opacity:.4;';

    chars.forEach((char, i) => {
      const rad = ((i * angle) - 90) * (Math.PI / 180);
      const x   = radius * Math.cos(rad);
      const y   = radius * Math.sin(rad);
      const t   = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', x);
      t.setAttribute('y', y);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'middle');
      t.setAttribute('transform', `rotate(${i * angle}, ${x}, ${y})`);
      t.setAttribute('fill', '#7a6855');
      t.setAttribute('font-size', '9');
      t.setAttribute('font-family', 'DM Sans, sans-serif');
      t.textContent = char;
      svg.appendChild(t);
    });

    beanText.replaceWith(svg);
  }

})();
