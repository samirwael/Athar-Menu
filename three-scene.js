/* ══════════════════════════════════════════════
   ATHAR — Three.js Hero Particle Scene
══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Load Three.js from CDN then init ──
  function loadScript(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function initThreeScene() {
    const THREE = window.THREE;
    if (!THREE) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Canvas container sits behind hero content
    const container = document.createElement('div');
    container.id = 'three-canvas-wrap';
    container.style.cssText = `
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    `;
    hero.appendChild(container);

    // Bump hero-bg and hero-content z-index
    const heroBg = hero.querySelector('.hero-bg');
    if (heroBg) heroBg.style.zIndex = '0';
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) heroContent.style.zIndex = '3';
    const heroScroll = hero.querySelector('.hero-scroll');
    if (heroScroll) heroScroll.style.zIndex = '3';

    // Scene
    const scene = new THREE.Scene();

    const W = hero.offsetWidth || window.innerWidth;
    const H = hero.offsetHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Particle system ──
    const COUNT = 320;
    const positions = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);
    const opacities = new Float32Array(COUNT);
    const speeds    = new Float32Array(COUNT);
    const phases    = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 200;   // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 140;   // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;    // z
      sizes[i]     = Math.random() * 2.8 + 0.6;
      opacities[i] = Math.random() * 0.55 + 0.15;
      speeds[i]    = Math.random() * 0.006 + 0.002;
      phases[i]    = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

    // Custom shader material — golden glowing dots
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime:      { value: 0 },
        uMouse:     { value: new THREE.Vector2(0, 0) },
        uColor1:    { value: new THREE.Color('#b8924a') },
        uColor2:    { value: new THREE.Color('#d9c9b0') },
        uColor3:    { value: new THREE.Color('#8a6a2e') },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        uniform float uTime;
        uniform vec2  uMouse;
        varying float vOpacity;
        varying float vRand;

        float hash(float n) { return fract(sin(n) * 43758.5453123); }

        void main() {
          vRand = hash(aSize * 7.13 + aOpacity * 3.71);

          // Gentle drift
          vec3 pos = position;
          pos.y += sin(uTime * 0.4 + vRand * 6.28) * 2.5;
          pos.x += cos(uTime * 0.3 + vRand * 5.11) * 1.8;
          pos.z += sin(uTime * 0.25 + vRand * 4.0) * 1.2;

          // Subtle mouse repulsion
          vec2 screenPos = (pos.xy / vec2(100.0, 70.0));
          vec2 diff = screenPos - uMouse;
          float dist = length(diff);
          if (dist < 0.35) {
            pos.xy += normalize(diff) * (0.35 - dist) * 6.0;
          }

          // Wrap vertically so particles cycle
          pos.y = mod(pos.y + 70.0 + uTime * aSize * 0.12, 140.0) - 70.0;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = aSize * (90.0 / -mvPos.z);
          vOpacity = aOpacity;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying float vOpacity;
        varying float vRand;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;

          // Soft circular glow
          float alpha = smoothstep(0.5, 0.0, d) * vOpacity;

          // Pick colour by random band
          vec3 col = vRand < 0.45 ? uColor1 :
                     vRand < 0.75 ? uColor2 : uColor3;

          // Add glow core
          float glow = smoothstep(0.25, 0.0, d) * 0.6;
          col = mix(col, vec3(1.0, 0.95, 0.8), glow);

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ── Floating ring ──
    const ringGeo = new THREE.TorusGeometry(28, 0.18, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xb8924a,
      transparent: true,
      opacity: 0.12,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.6;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(42, 0.10, 8, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xd9c9b0,
      transparent: true,
      opacity: 0.07,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.2;
    ring2.rotation.z = 0.4;
    scene.add(ring2);

    // ── Mouse tracking ──
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth)  * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // ── Resize ──
    window.addEventListener('resize', () => {
      const w = hero.offsetWidth || window.innerWidth;
      const h = hero.offsetHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // ── Animation loop ──
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value = t;

      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      mat.uniforms.uMouse.value.set(mouseX, -mouseY);

      // Gently rotate particle cloud with mouse
      particles.rotation.y = mouseX * 0.08;
      particles.rotation.x = mouseY * 0.05;

      // Rings
      ring1.rotation.z = t * 0.07 + mouseX * 0.15;
      ring1.rotation.y = mouseY * 0.12;
      ring2.rotation.z = -t * 0.05 + mouseX * 0.1;
      ring2.rotation.x = Math.PI / 2.2 + mouseY * 0.08;

      renderer.render(scene, camera);
    }

    animate();
  }

  // ── Bootstrap ──
  function boot() {
    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
      function () {
        // Small delay to let hero render first
        setTimeout(initThreeScene, 120);
      }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
