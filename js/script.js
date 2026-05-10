/* ============================================================
   MAURICIO VARELA — PORTAFOLIO · script.js
   ============================================================ */

/* ── NAVBAR: scroll shadow + hamburger ── */
(function () {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
})();

/* ── REVEAL ON SCROLL ── */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || i * 60;
          setTimeout(() => entry.target.classList.add('visible'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(el => observer.observe(el));
})();

/* ── SKILL BARS ANIMATION ── */
(function () {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
})();

/* ── AUDIO PLAYER ── */
(function () {
  const audio       = document.getElementById('mainAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon    = document.getElementById('playIcon');
  const pauseIcon   = document.getElementById('pauseIcon');
  const progressBar = document.getElementById('progressBar');
  const progressWrap = document.getElementById('progressWrap');
  const audioTime   = document.getElementById('audioTime');

  if (!audio || !playPauseBtn) return;

  // Formato mm:ss
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Play / Pause
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {
        console.warn('Audio no disponible. Coloca el archivo en assets/audio/presentacion.mp3');
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    playIcon.style.display  = 'none';
    pauseIcon.style.display = 'block';
  });

  audio.addEventListener('pause', () => {
    playIcon.style.display  = 'block';
    pauseIcon.style.display = 'none';
  });

  audio.addEventListener('ended', () => {
    playIcon.style.display  = 'block';
    pauseIcon.style.display = 'none';
    progressBar.style.width = '0%';
    audioTime.textContent   = '0:00';
  });

  // Progreso
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width  = pct + '%';
    audioTime.textContent    = formatTime(audio.currentTime);
  });

  // Clic en barra de progreso
  if (progressWrap) {
    progressWrap.addEventListener('click', e => {
      if (!audio.duration) return;
      const rect = progressWrap.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      audio.currentTime = ratio * audio.duration;
    });
  }
})();

/* ── CURSOR PERSONALIZADO (manga) ── */
(function () {
  // Solo en desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'manga-cursor';
  cursor.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 18px; height: 18px;
    border: 2px solid #c0001a;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.08s ease, width 0.15s, height 0.15s, opacity 0.2s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.width  = '28px';
    cursor.style.height = '28px';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.width  = '18px';
    cursor.style.height = '18px';
  });

  // Agrandar sobre enlaces
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width     = '32px';
      cursor.style.height    = '32px';
      cursor.style.borderColor = '#ff001a';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width     = '18px';
      cursor.style.height    = '18px';
      cursor.style.borderColor = '#c0001a';
    });
  });
})();

/* ── GLITCH EFFECT EN EL NOMBRE (hero) ── */
(function () {
  const nameLines = document.querySelectorAll('.name-line');
  if (!nameLines.length) return;

  setInterval(() => {
    const target = nameLines[Math.floor(Math.random() * nameLines.length)];
    target.style.transform = `skewX(${(Math.random() - 0.5) * 4}deg) translateX(${(Math.random() - 0.5) * 6}px)`;
    target.style.opacity   = (0.85 + Math.random() * 0.15).toString();
    setTimeout(() => {
      target.style.transform = '';
      target.style.opacity   = '1';
    }, 90);
  }, 3200);
})();

/* ── CANVAS PARTÍCULAS (fondo sutil) ── */
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.18;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const count = 28;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 1 + Math.random() * 1.8,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    red: Math.random() < 0.3,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.red ? '#c0001a' : '#f0ece4';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
