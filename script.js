document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });

  const revealElems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('show'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealElems.forEach(el => observer.observe(el));

  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('site-theme');
  if (saved === 'light') document.body.classList.add('light');
  const updateToggle = () => { toggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙'; }
  updateToggle();
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('site-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateToggle();
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 140; const bottom = top + sec.offsetHeight; const id = sec.getAttribute('id');
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (!link) return; if (y >= top && y < bottom) { document.querySelectorAll('nav a').forEach(x => x.classList.remove('active')); link.classList.add('active'); }
    });
  });
});

(function(){
  const canvas = document.getElementById('bg-canvas'); if (!canvas) return; const ctx = canvas.getContext('2d'); let w = canvas.width = innerWidth; let h = canvas.height = innerHeight; const dpi = window.devicePixelRatio || 1; canvas.width = w * dpi; canvas.height = h * dpi; canvas.style.width = w + 'px'; canvas.style.height = h + 'px'; ctx.scale(dpi, dpi);
  window.addEventListener('resize', () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; canvas.width = w * dpi; canvas.height = h * dpi; canvas.style.width = w + 'px'; canvas.style.height = h + 'px'; ctx.scale(dpi, dpi); });
  const particles = []; const count = Math.max(40, Math.floor((w*h) / 60000));
  for (let i=0;i<count;i++){ particles.push({ x: Math.random()*w, y: Math.random()*h, r: 0.8 + Math.random()*1.8, vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2, hue: 200 + Math.random()*60 }); }
  function loop(){ ctx.clear
