/* ══════════════════════════════════════════
   ATHAR — PAGE FLIP TRANSITION SYSTEM
══════════════════════════════════════════ */

// ── BUILD THE FLIP STAGE ──
function createFlipStage() {
  if (document.querySelector('.flip-stage')) return document.querySelector('.flip-stage');
  const stage = document.createElement('div');
  stage.className = 'flip-stage';
  stage.innerHTML = `
    <div class="flip-page">
      <div class="flip-front">
        <div class="flip-logo">
          <img src="athar-logo-light-t.png" alt="ATHAR">
        </div>
      </div>
    </div>`;
  document.body.appendChild(stage);
  return stage;
}

// ── RUN THE FLIP ──
let _flipBusy = false;
function runPageTransition(callback) {
  if (_flipBusy) { if (callback) callback(); return; }
  _flipBusy = true;

  const stage = createFlipStage();
  const page  = stage.querySelector('.flip-page');
  const logo  = stage.querySelector('.flip-logo');

  // Hard-reset: fully hidden off-screen to the left
  page.style.transition = 'none';
  page.style.clipPath    = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
  page.style.opacity     = '1';
  logo.style.opacity     = '0';
  logo.style.transform   = 'scale(0.88)';
  stage.style.pointerEvents = 'all';

  void page.offsetWidth; // force reflow

  // Phase 1 — sweep in from left (diagonal leading edge)
  page.style.transition = 'clip-path 0.62s cubic-bezier(0.76, 0, 0.24, 1)';
  page.style.clipPath   = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

  setTimeout(() => {
    logo.style.transition  = 'opacity 0.22s ease, transform 0.22s ease';
    logo.style.opacity     = '1';
    logo.style.transform   = 'scale(1)';
  }, 200);

  // Navigate at the midpoint
  setTimeout(() => { if (callback) callback(); }, 480);

  // Phase 2 — sweep out to the right (diagonal trailing edge)
  setTimeout(() => {
    logo.style.transition = 'opacity 0.15s ease';
    logo.style.opacity    = '0';

    setTimeout(() => {
      page.style.transition = 'clip-path 0.55s cubic-bezier(0.76, 0, 0.24, 1)';
      page.style.clipPath   = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';

      setTimeout(() => {
        // Fully hide and unlock
        page.style.transition    = 'none';
        page.style.clipPath      = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
        stage.style.pointerEvents = 'none';
        _flipBusy = false;
      }, 600);
    }, 120);
  }, 820);
}

function initPageTransitions() {
  createFlipStage();
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      runPageTransition(() => {
        target.scrollIntoView({ behavior: 'instant' });
      });
    });
  });
}

// ── CURSOR GLOW ──
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  const ambient = document.createElement('div');
  ambient.className = 'cursor-glow-ambient';
  const dot = document.createElement('div');
  dot.className = 'cursor-glow-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-glow-ring';
  document.body.append(ambient, dot, ring);

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, ambX = 0, ambY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    ambX += (mouseX - ambX) * 0.06; ambY += (mouseY - ambY) * 0.06;
    ambient.style.left = ambX + 'px'; ambient.style.top = ambY + 'px';
    requestAnimationFrame(animateRing);
  })();

  const sel = 'a, button, .menu-card, .tab, .contact-link, .featured-btn, .back-top';
  document.addEventListener('mouseover', e => { if (e.target.closest(sel)) document.body.classList.add('cursor-hovering'); });
  document.addEventListener('mouseout',  e => { if (e.target.closest(sel)) document.body.classList.remove('cursor-hovering'); });
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale,.reveal-fade,.gold-divider');
  if (!els.length || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in-view')); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── APPLY REVEAL CLASSES TO EXISTING ELEMENTS ──
function applyRevealClasses() {
  const aboutBrand = document.querySelector('.about-brand');
  const aboutContent = document.querySelector('.about-content');
  if (aboutBrand) aboutBrand.classList.add('reveal-left');
  if (aboutContent) aboutContent.classList.add('reveal-right');
  document.querySelectorAll('.stat').forEach((s, i) => s.classList.add('reveal-up', `delay-${i + 1}`));

  const menuHeader = document.querySelector('.menu-header');
  if (menuHeader) menuHeader.classList.add('reveal-fade');

  const contactBrand = document.querySelector('.contact-brand');
  if (contactBrand) contactBrand.classList.add('reveal-left');
  document.querySelectorAll('.contact-link').forEach((l, i) => l.classList.add('reveal-right', `delay-${i + 1}`));

  document.querySelectorAll('.section-label').forEach(el => el.classList.add('reveal-fade'));

  // Gold dividers
  ['.menu-header', '.about-content', '.contact-inner'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) { const d = document.createElement('div'); d.className = 'gold-divider'; el.appendChild(d); }
  });
}

// ══════════════════════════════════════════
// END OF TRANSITION SYSTEM
// ══════════════════════════════════════════

// ── FULL ATHAR MENU DATA ──
const menuDataDefault = [
  { cat: "Hot Drinks", name: "Espresso", desc: "Bold single-origin shot, rich and full-bodied.", price: "50 EGP",
    img: "espresso.jpg" },
  { cat: "Hot Drinks", name: "Turkish Coffee", desc: "Traditional finely ground coffee, slow-simmered to perfection.", price: "45 EGP",
    img: "turkish-coffee.jpg" },
  { cat: "Hot Drinks", name: "Americano", desc: "Espresso diluted with hot water for a smooth, long cup.", price: "60 EGP",
    img: "americano.jpg" },
  { cat: "Hot Drinks", name: "Macchiato", desc: "Espresso topped with a small dollop of foam.", price: "60 EGP",
    img: "macchiato.jpg" },
  { cat: "Hot Drinks", name: "Cortado", desc: "Equal parts espresso and warm steamed milk.", price: "65 EGP",
    img: "cortado.jpg" },
  { cat: "Hot Drinks", name: "Flat White", desc: "Ristretto double shot with silky microfoam — bold and smooth.", price: "85 EGP",
    img: "flat-white.jpg" },
  { cat: "Hot Drinks", name: "Hot Chocolate", desc: "Rich, velvety hot chocolate made with premium cocoa.", price: "85 EGP",
    img: "hot-chocolate.jpg" },
  { cat: "Hot Drinks", name: "Cappuccino", desc: "Double espresso with equal parts steamed milk and velvety foam.", price: "80 EGP",
    img: "cappuccino.jpg" },
  { cat: "Hot Drinks", name: "French Coffee", desc: "Rich and aromatic French-press style coffee.", price: "55 EGP",
    img: "french-coffee.jpg" },
  { cat: "Hot Drinks", name: "Hazelnut Coffee", desc: "Espresso with a warm, nutty hazelnut twist.", price: "60 EGP",
    img: "hazelnut-coffee.jpg" },
  { cat: "Hot Drinks", name: "Hot Latte", desc: "Espresso and silky steamed milk in perfect balance.", price: "85 EGP",
    img: "hot-latte.jpg" },
  { cat: "Hot Drinks", name: "Hot Spanish Latte", desc: "Espresso with condensed milk for a creamy, sweet kick.", price: "100 EGP",
    img: "hot-spanish-latte.jpg" },
  { cat: "Hot Drinks", name: "Hot Mocha", desc: "Espresso, chocolate, and steamed milk — indulgent and rich.", price: "100 EGP",
    img: "hot-mocha.jpg" },
  { cat: "Hot Drinks", name: "Hot White Mocha", desc: "White chocolate, espresso, and steamed milk — dreamy and sweet.", price: "110 EGP",
    img: "hot-white-mocha.jpg" },
  { cat: "Hot Drinks", name: "Espresso Alferado", desc: "A bold espresso float over cold cream — unique and refreshing.", price: "100 EGP",
    img: "espresso-alferado.jpg" },
  { cat: "Hot Drinks", name: "Con Panna Espresso", desc: "Espresso crowned with a generous swirl of whipped cream.", price: "100 EGP",
    img: "con-panna-espresso.jpg" },
  { cat: "Hot Drinks", name: "Hot Salted Caramel Latte", desc: "Sweet caramel with a pinch of sea salt over espresso and milk.", price: "100 EGP",
    img: "hot-salted-caramel-latte.jpg" },
  { cat: "Hot Drinks", name: "Hot Caramel Macchiato", desc: "Vanilla-scented milk, espresso, and caramel drizzle.", price: "100 EGP",
    img: "hot-caramel-macchiato.jpg" },
  { cat: "Hot Drinks", name: "Hot Spicy Spanish Latte", desc: "Spanish latte with a warm spicy kick — bold and addictive.", price: "100 EGP",
    img: "hot-spicy-spanish-latte.jpg" },
  { cat: "Hot Drinks", name: "Hot Peanut Butter Latte", desc: "Nutty, creamy peanut butter blended into a latte.", price: "100 EGP",
    img: "hot-peanut-butter-latte.jpg" },
  { cat: "Hot Drinks", name: "Hot Pistachio Latte", desc: "Aromatic pistachio syrup with espresso and steamed milk.", price: "130 EGP",
    img: "hot-pistachio-latte.jpg" },
  { cat: "Iced Coffee", name: "Iced Americano", desc: "Espresso over ice — clean, crisp, and energising.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Macchiato", desc: "Bold and creamy iced macchiato with rich espresso layered over chilled milk.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Latte", desc: "Chilled espresso with cold milk over a bed of ice.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1582197329436-9b45ccd9b2b5?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Spanish Latte", desc: "Condensed milk and espresso on ice — sweet and creamy.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Salted Caramel", desc: "Smooth chilled coffee, rich buttery caramel, and a hint of sea salt.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1593790012132-e2e96efed22e?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Mocha", desc: "Espresso, chocolate sauce, and milk — chilled and luscious.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Caramel Macchiato", desc: "Layered vanilla milk, espresso, and caramel drizzle over ice.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Pistachio Latte", desc: "Creamy espresso with sweet nutty pistachio and milk over ice.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1648920035823-7a62f1e53545?w=600&q=80" },
  { cat: "Coffee Blended", name: "Salted Caramel Coffee", desc: "Blended espresso with caramel and a touch of sea salt.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80" },
  { cat: "Coffee Blended", name: "Spanish Coffee", desc: "Classic Spanish latte blended into a creamy frozen treat.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=600&q=80" },
  { cat: "Coffee Blended", name: "White Mocha Coffee", desc: "White chocolate and espresso blended into a frosty delight.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80" },
  { cat: "Coffee Blended", name: "Peanut Butter Coffee", desc: "Creamy peanut butter and espresso blended with ice.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Vanilla Classic Blend", desc: "Smooth vanilla blended coffee — a timeless classic.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Caramel Blend", desc: "Creamy caramel blended with ice and milk for a smooth frozen treat.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1605944797578-cfa5052e3803?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Chocolate Blend", desc: "Rich chocolate blended with ice and milk for an indulgent frozen treat.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Piña Colada Blend", desc: "Tropical pineapple and creamy coconut blended with ice.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Pistachio Blend", desc: "The premium combo — pistachio and matcha, blended over ice.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80" },
  { cat: "Milkshakes", name: "Mango Milkshake", desc: "Thick and tropical mango shake, velvety and refreshing.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=600&q=80" },
  { cat: "Milkshakes", name: "Strawberry Milkshake", desc: "Sweet and creamy strawberry shake made with real fruit.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80" },
  { cat: "Milkshakes", name: "Blueberry Milkshake", desc: "Rich blueberry shake with a deep, fruity flavour.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=600&q=80" },
  { cat: "Milkshakes", name: "Chocolate Milkshake", desc: "Classic chocolate shake — thick, creamy, and indulgent.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80" },
  { cat: "Milkshakes", name: "Oreo Milkshake", desc: "Crushed Oreos blended into a silky, dreamy shake.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1586917049352-3c4aac24f7b8?w=600&q=80" },
  { cat: "Milkshakes", name: "Pistachio Milkshake", desc: "Premium pistachio shake — aromatic and luxuriously creamy.", price: "120 EGP",
    img: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=600&q=80" },
  { cat: "Fresh Juice", name: "Orange Juice", desc: "Freshly squeezed orange — bright, tropical, and naturally sweet.", price: "55 EGP",
    img: "https://images.unsplash.com/photo-1534353473418-4cfa0e1e11b7?w=600&q=80" },
  { cat: "Fresh Juice", name: "Lemon Mint", desc: "Freshly squeezed lemon with cool mint — the ultimate refresher.", price: "70 EGP",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80" },
  { cat: "Fresh Juice", name: "Mango Juice", desc: "Freshly squeezed mango — bright, tropical, and naturally sweet.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80" },
  { cat: "Fresh Juice", name: "Strawberry Juice", desc: "Pure fresh strawberries pressed into a vibrant, sweet juice.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1495478137967-e7cbe7ebf5b7?w=600&q=80" },
  { cat: "Fresh Juice", name: "Strawberry Vanilla", desc: "Sweet strawberry and creamy vanilla blended with ice.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&q=80" },
  { cat: "Refreshers", name: "Sunshine", desc: "A bright citrus refresher that wakes up your senses.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80" },
  { cat: "Refreshers", name: "Sunrise", desc: "A layered citrus and berry refresher — beautiful and bold.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1609258396839-40e2a374cdae?w=600&q=80" },
  { cat: "Refreshers", name: "Jelly Cola", desc: "Icy cold mint refresher — clean and invigorating.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=80" },
  { cat: "Refreshers", name: "Mojito", desc: "Lime, mint, and soda — the classic non-alcoholic mojito.", price: "80 EGP",
    img: "https://images.unsplash.com/photo-1571950006418-f26b66c56fba?w=600&q=80" },
  { cat: "Refreshers", name: "Pineapple Lemon", desc: "Sweet pineapple and zesty lemon with a vibrant Blue Curaçao layer.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=600&q=80" },
  { cat: "Refreshers", name: "Double Gum", desc: "Watermelon, fresh strawberry, and minty mojito — vibrant and cooling.", price: "120 EGP",
    img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80" },
  { cat: "Refreshers", name: "Energy Mojito", desc: "Mojito with Red Bull — refreshing with a buzz.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80" },
  { cat: "Refreshers", name: "Water", desc: "Still mineral water — pure and simple.", price: "10 EGP",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80" },
  { cat: "Matcha", name: "Hot Matcha", desc: "Ceremonial grade matcha whisked with steamed oat milk.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80" },
  { cat: "Matcha", name: "Iced Matcha", desc: "Chilled matcha over ice — earthy, smooth, and energising.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1610874696409-2e71b17a7a70?w=600&q=80" },
  { cat: "Matcha", name: "Strawberry Matcha", desc: "A smooth blend of earthy matcha and sweet strawberry.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80" },
  { cat: "Matcha", name: "Iced Spanish Matcha", desc: "Matcha with condensed milk on ice — sweet and indulgent.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1615615228002-890bb61cac6e?w=600&q=80" },
  { cat: "Matcha", name: "Matcha Blended", desc: "Blended matcha frappe — icy cold and vibrantly green.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1582396269698-0b99de6a1a24?w=600&q=80" },
  { cat: "Matcha", name: "Spanish Matcha Blended", desc: "Condensed milk and matcha blended with ice — rich and creamy.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1548455850-74c48b05e5af?w=600&q=80" },
  { cat: "Matcha", name: "Salted Caramel Matcha Blended", desc: "Matcha meets salted caramel in this frozen luxurious blend.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1605944797578-cfa5052e3803?w=600&q=80" },
  { cat: "Matcha", name: "White Chocolate Matcha", desc: "White chocolate and matcha blended — sweet, creamy perfection.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80" },
  { cat: "Matcha", name: "Pistachio Matcha Blended", desc: "The premium combo — pistachio and matcha, blended over ice.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&q=80" },
  { cat: "Tea", name: "Tea", desc: "Classic hot brewed tea — simple, warming, and comforting.", price: "35 EGP",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80" },
  { cat: "Tea", name: "Ice Tea — Peach", desc: "Chilled peach-infused iced tea — fruity and perfectly sweet.", price: "60 EGP",
    img: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600&q=80" },
  { cat: "Tea", name: "Ice Tea — Passion Fruit", desc: "Passion fruit iced tea — tangy, tropical, and refreshing.", price: "60 EGP",
    img: "https://images.unsplash.com/photo-1587888637140-849b37ba2dc4?w=600&q=80" },
  { cat: "Breakfast", name: "Plain Croissant", desc: "Buttery, flaky croissant baked to golden perfection.", price: "65 EGP",
    img: "" },
  { cat: "Breakfast", name: "Croissant Mix", desc: "A golden croissant filled with a delicious savoury mix — a perfect bite.", price: "95 EGP",
    img: "" },
  { cat: "Desserts", name: "Honey Cake", desc: "Layers of honey-soaked sponge — moist, sweet, and beautiful.", price: "80 EGP",
    img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80" },
  { cat: "Desserts", name: "Cheese Cake", desc: "Creamy classic cheesecake on a buttery biscuit base.", price: "80 EGP",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80" },
  { cat: "Desserts", name: "Chocolate Brownie", desc: "Dense, fudgy brownie with a crinkly top — pure chocolate bliss.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80" },
  { cat: "Desserts", name: "Tiramisu", desc: "Classic Italian espresso dessert — light, creamy, and irresistible.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80" },
  { cat: "Desserts", name: "Dark Molten Cake", desc: "Rich dark chocolate blended with a decadent, fudgy frozen treat.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80" },
  { cat: "Desserts", name: "Nutella Molten Cake", desc: "Creamy Nutella blended into a rich chocolate-hazelnut frozen treat.", price: "120 EGP",
    img: "https://images.unsplash.com/photo-1611329532992-0b7fa4c4d98e?w=600&q=80" },
  { cat: "Extras", name: "Caramel", desc: "Add a drizzle of rich caramel to any drink.", price: "20 EGP",
    img: "https://images.unsplash.com/photo-1561040359-21b5a6f5e06b?w=600&q=80" },
  { cat: "Extras", name: "Nutella", desc: "A generous swirl of Nutella added to your order.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&q=80" },
  { cat: "Extras", name: "Milk", desc: "Add extra milk to your drink.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80" },
  { cat: "Extras", name: "Syrup", desc: "Your choice of flavour syrup.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80" },
  { cat: "Extras", name: "Sauce", desc: "Add a sauce topping to your drink.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80" },
  { cat: "Extras", name: "Ice Cream", desc: "Add a scoop of ice cream.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1567206563114-c179706688d4?w=600&q=80" },
  { cat: "Extras", name: "Pistachio", desc: "Premium pistachio syrup or topping added to your drink.", price: "35 EGP",
    img: "https://images.unsplash.com/photo-1617957689233-207e3cd3c610?w=600&q=80" }
];

// ── IndexedDB SETUP ──
const DB_NAME    = "athar_db";
const DB_STORE   = "image_overrides";
const DB_DETAILS = "item_overrides";
const DB_ADDED   = "added_items";
const DB_DELETED = "deleted_items";
const DB_VERSION = 3;
let _db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (_db) { resolve(_db); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains(DB_STORE))   d.createObjectStore(DB_STORE);
      if (!d.objectStoreNames.contains(DB_DETAILS)) d.createObjectStore(DB_DETAILS);
      if (!d.objectStoreNames.contains(DB_ADDED))   d.createObjectStore(DB_ADDED);
      if (!d.objectStoreNames.contains(DB_DELETED)) d.createObjectStore(DB_DELETED);
    };
    req.onsuccess = e => { _db = e.target.result; resolve(_db); };
    req.onerror   = () => reject(req.error);
    // If another tab has an older DB version open, unblock by closing it
    req.onblocked = () => {
      console.warn("IndexedDB upgrade blocked — close other tabs and reload.");
      reject(new Error("IDB blocked"));
    };
  });
}

function storeGetAll(storeName) {
  return openDB().then(db => new Promise((resolve, reject) => {
    try {
      const tx    = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const keys = [], values = [];
      const req = store.openCursor();
      req.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) { keys.push(cursor.key); values.push(cursor.value); cursor.continue(); }
        else { const obj = {}; keys.forEach((k, i) => obj[k] = values[i]); resolve(obj); }
      };
      req.onerror = () => reject(req.error);
      tx.onerror  = () => reject(tx.error);
    } catch (e) { reject(e); }
  })).catch(() => ({})); // always fall back to empty object so the page still renders
}

function dbGetAll() { return storeGetAll(DB_STORE); }

// ── MERGE IMAGE + DETAIL OVERRIDES FROM IndexedDB ──
async function buildMenuData() {
  const [imgOverrides, detOverrides, addedItems, deletedKeys] = await Promise.all([
    storeGetAll(DB_STORE),
    storeGetAll(DB_DETAILS),
    storeGetAll(DB_ADDED),
    storeGetAll(DB_DELETED)
  ]);
  // Start from base, filter out deleted, apply overrides
  const base = menuDataDefault
    .filter(item => !deletedKeys[item.cat + "::" + item.name])
    .map(item => {
      const key = item.cat + "::" + item.name;
      const merged = { ...item };
      if (imgOverrides[key]) merged.img = imgOverrides[key];
      if (detOverrides[key]) Object.assign(merged, detOverrides[key]);
      return merged;
    });
  // Append admin-added items (apply image overrides too if any)
  const added = Object.values(addedItems).map(item => {
    const key = item.cat + "::" + item.name;
    const merged = { ...item };
    if (imgOverrides[key]) merged.img = imgOverrides[key];
    return merged;
  });
  return [...base, ...added];
}

async function initMenuData() {
  try {
    menuData = await buildMenuData();
  } catch (e) {
    menuData = menuDataDefault.map(item => ({ ...item }));
  }
  initFeatured();
  renderMenu(activeCategory);
}

async function refreshMenuData() {
  try {
    menuData = await buildMenuData();
  } catch (e) {}
  renderMenu(activeCategory);
  // Re-render spotlight in place with updated images (direction 0 = no slide)
  if (featuredHistory[featuredHistoryIndex]) {
    const cur = featuredHistory[featuredHistoryIndex];
    const updated = menuData.find(i => i.cat === cur.cat && i.name === cur.name) || cur;
    featuredHistory[featuredHistoryIndex] = updated;
    renderFeaturedItem(updated, 0);
  }
}

let menuData = menuDataDefault.map(item => ({ ...item }));

// ── LIVE SYNC — admin signals via localStorage flag, we re-read IndexedDB ──
window.addEventListener("storage", (e) => {
  if (e.key === "athar_idb_updated") {
    refreshMenuData();
  }
});

// ── CATEGORY ACCENT COLORS ──
const catColors = {
  "Hot Drinks":         { bg: "#4a2810", accent: "#c9a97a" },
  "Iced Coffee":        { bg: "#1a3040", accent: "#7ab8d4" },
  "Coffee Blended":     { bg: "#3a2010", accent: "#c4a060" },
  "Non-Coffee Blended": { bg: "#1a2818", accent: "#8ac48a" },
  "Milkshakes":         { bg: "#3a1030", accent: "#d490b0" },
  "Fresh Juice":        { bg: "#2a3010", accent: "#b0c860" },
  "Refreshers":         { bg: "#102830", accent: "#60c0c0" },
  "Matcha":             { bg: "#142814", accent: "#70b870" },
  "Tea":                { bg: "#301818", accent: "#c48050" },
  "Breakfast":          { bg: "#3a2808", accent: "#e8b860" },
  "Desserts":           { bg: "#2a1018", accent: "#c06880" },
  "Extras":             { bg: "#282010", accent: "#b8924a" },
};

let activeCategory = "All";
let activeSearch = "";
let activeSort = "default";
const featuredPageSize = 1;
let featuredTimer = null;
let featuredRingRaf = null;
let featuredHistory = [];
let featuredHistoryIndex = -1;
const FEATURED_INTERVAL = 6000; // ms per slide
let featuredTimerStart = 0;
let featuredPaused = false;

function toPriceNumber(value) {
  return Number.parseFloat(String(value).replace(/[^\d.]/g, "")) || 0;
}

function getFilteredItems(category) {
  let items = category === "All" ? [...menuData] : menuData.filter((i) => i.cat === category);
  if (activeSearch.trim()) {
    const q = activeSearch.trim().toLowerCase();
    items = items.filter((item) =>
      `${item.name} ${item.desc} ${item.cat}`.toLowerCase().includes(q)
    );
  }
  if (activeSort === "price-asc") items.sort((a, b) => toPriceNumber(a.price) - toPriceNumber(b.price));
  if (activeSort === "price-desc") items.sort((a, b) => toPriceNumber(b.price) - toPriceNumber(a.price));
  if (activeSort === "name-asc") items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

// pickRandomFeaturedSet kept for compatibility (unused by new spotlight)
function pickRandomFeaturedSet(excludedKey = "") {
  return [pickRandomFeaturedItem(excludedKey)];
}

// ── FEATURED SPOTLIGHT ──

function pickRandomFeaturedItem(excludeName = "") {
  // Prefer items with images
  const pool = menuData.filter(i => i.img && i.name !== excludeName);
  const fallback = menuData.filter(i => i.name !== excludeName);
  const source = pool.length ? pool : fallback;
  if (!source.length) return menuData[0];
  return source[Math.floor(Math.random() * source.length)];
}

function renderFeaturedItem(item, direction = 1) {
  const spotlight = document.getElementById("fsSpotlight");
  const imgWrap   = document.getElementById("fsImgWrap");
  const imgEl     = document.getElementById("fsImg");
  const imgBg     = document.getElementById("fsImgBg");
  const imgPh     = document.getElementById("fsImgPlaceholder");
  const badgeEl   = document.getElementById("fsBadge");
  const infoEl    = document.getElementById("fsInfo");
  const catEl     = document.getElementById("fsCat");
  const nameEl    = document.getElementById("fsName");
  const descEl    = document.getElementById("fsDesc");
  const priceEl   = document.getElementById("fsPrice");
  const counter   = document.getElementById("fsCounter");

  if (!spotlight) return;

  // Direction classes for slide animation
  const outClass = direction > 0 ? "fs-exit-left"  : "fs-exit-right";
  const inClass  = direction > 0 ? "fs-enter-right" : "fs-enter-left";

  // Animate out
  imgWrap.classList.add(outClass);
  infoEl.classList.add(outClass);

  setTimeout(() => {
    // Swap content
    const col = catColors[item.cat] || { bg: "#2e1a0e", accent: "#b8924a" };

    if (item.img) {
      imgEl.src = item.img;
      imgEl.style.display = "block";
      imgPh.style.display = "none";
    } else {
      imgEl.style.display = "none";
      imgPh.style.display = "flex";
    }

    // Blurred colour bg from category
    imgBg.style.background = `linear-gradient(135deg, ${col.bg} 0%, ${col.bg}cc 60%, rgba(20,10,3,0.9) 100%)`;
    badgeEl.textContent    = item.cat;
    badgeEl.style.color    = col.accent;
    badgeEl.style.borderColor = col.accent + "55";

    catEl.textContent   = item.cat;
    catEl.style.color   = col.accent;
    nameEl.textContent  = item.name;
    descEl.textContent  = item.desc;
    priceEl.textContent = item.price;

    // Counter
    if (counter) counter.textContent = `${featuredHistoryIndex + 1} / ${featuredHistory.length}`;

    // Remove out, add in
    imgWrap.classList.remove(outClass);
    infoEl.classList.remove(outClass);
    imgWrap.classList.add(inClass);
    infoEl.classList.add(inClass);

    // Clean up in-class after animation
    setTimeout(() => {
      imgWrap.classList.remove(inClass);
      infoEl.classList.remove(inClass);
    }, 500);

  }, 280);
}

function showRandomFeatured(pushHistory = true, direction = 1) {
  const current = featuredHistory[featuredHistoryIndex];
  const excludeName = current ? current.name : "";
  const next = pickRandomFeaturedItem(excludeName);
  if (pushHistory) {
    featuredHistory = featuredHistory.slice(0, featuredHistoryIndex + 1);
    featuredHistory.push(next);
    featuredHistoryIndex = featuredHistory.length - 1;
  }
  renderFeaturedItem(next, direction);
  resetFeaturedTimer();
}

function stepFeatured(direction) {
  if (direction < 0 && featuredHistoryIndex > 0) {
    featuredHistoryIndex -= 1;
    renderFeaturedItem(featuredHistory[featuredHistoryIndex], direction);
    resetFeaturedTimer();
    return;
  }
  showRandomFeatured(true, direction);
}

// ── Countdown ring animation ──
function startRingCountdown() {
  if (featuredRingRaf) cancelAnimationFrame(featuredRingRaf);
  const prog = document.getElementById("fsRingProg");
  if (!prog) return;
  const circumference = 2 * Math.PI * 18; // r=18
  prog.style.strokeDasharray  = circumference;
  featuredTimerStart = performance.now();

  function tick(now) {
    if (featuredPaused) { featuredRingRaf = requestAnimationFrame(tick); return; }
    const elapsed = now - featuredTimerStart;
    const ratio   = Math.min(elapsed / FEATURED_INTERVAL, 1);
    prog.style.strokeDashoffset = circumference * ratio;
    if (ratio < 1) {
      featuredRingRaf = requestAnimationFrame(tick);
    }
  }
  featuredRingRaf = requestAnimationFrame(tick);
}

function resetFeaturedTimer() {
  if (featuredTimer) clearTimeout(featuredTimer);
  startRingCountdown();
  featuredTimer = setTimeout(() => {
    if (!featuredPaused) showRandomFeatured(true, 1);
  }, FEATURED_INTERVAL);
}

function initFeatured() {
  const nextBtn   = document.getElementById("fsNext");
  const prevBtn   = document.getElementById("fsPrev");
  const spotlight = document.getElementById("fsSpotlight");

  showRandomFeatured(true, 1);

  if (nextBtn) nextBtn.addEventListener("click", () => stepFeatured(1));
  if (prevBtn) prevBtn.addEventListener("click", () => stepFeatured(-1));

  // Pause on hover
  if (spotlight) {
    spotlight.addEventListener("mouseenter", () => { featuredPaused = true; });
    spotlight.addEventListener("mouseleave", () => {
      featuredPaused = false;
      // reset timer so it doesn't fire immediately after unpause
      resetFeaturedTimer();
    });
  }
}

// ── RENDER MENU ──
let _menuRendering = false;

function buildMenuHTML(items, showCat) {
  return items.map((item, idx) => {
    const col = catColors[item.cat] || { bg: "#2e1a0e", accent: "#b8924a" };
    const delay = (idx % 24) * 0.045;
    return `
    <div class="menu-card" style="animation-delay:${delay}s">
      <div class="card-thumb" style="background:linear-gradient(145deg,${col.bg}ee,${col.bg}99);overflow:hidden;">
        ${item.img
          ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'">`
          : `<svg width="38" viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg" fill="${col.accent}" style="display:flex"><path d="M20 2 C13 11 7 18 7 28 C7 40 13 50 20 54 C27 50 33 40 33 28 C33 18 27 11 20 2Z"/></svg>`
        }
      </div>
      <div class="card-body">
        ${showCat ? `<div class="card-cat">${item.cat}</div>` : ""}
        <div class="card-name">${item.name}</div>
        ${item.desc ? `<div class="card-desc">${item.desc}</div>` : `<div class="card-desc"></div>`}
        <div class="card-price">${item.price}</div>
      </div>
    </div>`;
  }).join("");
}

function renderMenu(category) {
  const grid = document.getElementById("menuGrid");
  const items = getFilteredItems(category);
  const showCat = category === "All";

  if (!items.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#7a6040;padding:30px;">No items match your search.</p>';
    return;
  }

  const existingCards = grid.querySelectorAll(".menu-card");

  // If no existing cards, just render directly
  if (!existingCards.length) {
    grid.innerHTML = buildMenuHTML(items, showCat);
    return;
  }

  // Phase 1 — fly out existing cards with staggered delay
  existingCards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.025}s`;
    card.classList.add("flying-out");
  });

  // Find the longest fly-out duration and swap after
  const flyOutDuration = Math.min(existingCards.length * 25 + 280, 420);

  setTimeout(() => {
    // Phase 2 — inject new cards (they auto-animate via cardIn)
    grid.innerHTML = buildMenuHTML(items, showCat);
  }, flyOutDuration);
}

// ── TAB SWITCHING ──
function initTabs() {
  const tabsContainer = document.getElementById("menuTabs");
  const tabs = document.querySelectorAll(".tab");

  // Inject dividers between every tab
  tabs.forEach((tab, i) => {
    if (i < tabs.length - 1) {
      const divider = document.createElement('span');
      divider.className = 'tab-divider';
      tab.after(divider);
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.cat;
      renderMenu(activeCategory);
      tab.scrollIntoView({ inline: "center", behavior: "smooth" });
    });
  });
}

function initMenuControls() {
  const search = document.getElementById("menuSearch");
  const sort = document.getElementById("menuSort");
  if (search) search.addEventListener("input", () => { activeSearch = search.value; renderMenu(activeCategory); });
  if (sort) sort.addEventListener("change", () => { activeSort = sort.value; renderMenu(activeCategory); });
}

function initNavbar() {
  const nav = document.getElementById("navbar");
  const topBtn = document.getElementById("backToTop");
  const navLogoImg = document.querySelector(".nav-logo-img");

  function updateNav() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle("scrolled", scrolled);
    if (navLogoImg) {
      navLogoImg.src = scrolled ? "athar-logo-brown-t.png" : "athar-logo-light-t.png";
    }
    if (topBtn) topBtn.classList.toggle("show", window.scrollY > 520);
  }

  window.addEventListener("scroll", updateNav);
  updateNav(); // run once on load

  if (topBtn) topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const next = !menu.classList.contains("open");
    menu.classList.toggle("open", next);
    toggle.setAttribute("aria-expanded", String(next));
  });
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const blocks = document.querySelectorAll(".reveal");
  if (!blocks.length || !("IntersectionObserver" in window)) {
    blocks.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      });
    },
    { threshold: 0.12 }
  );
  blocks.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  applyRevealClasses();   // Add reveal classes to existing elements
  initPageTransitions();  // Page overlay on nav link clicks
  initCursorGlow();       // Gold cursor glow effect
  initScrollReveal();     // Scroll-triggered animations
  initTabs();
  initMenuControls();
  initNavbar();
  initMobileMenu();
  initReveal();
  initMenuData(); // loads from IndexedDB then renders menu + featured
});
