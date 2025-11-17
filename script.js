// Basic interactive behavior: menu toggle, faq, email validation, year
document.addEventListener('DOMContentLoaded', function () {

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('primary-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
      menuBtn.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('hidden');
    });
  }

  // FAQ toggles
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('aria-controls');
      const panel = document.getElementById(id);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.classList.toggle('hidden');
    });

    // Keyboard support for Enter/Space
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Email validation (live)
  const form = document.getElementById('contactForm');
  if (form) {
    const email = form.querySelector('input[type="email"]');
    const emailHelp = document.getElementById('emailHelp');

    email.addEventListener('input', () => {
      if (email.validity.valid) {
        emailHelp.classList.add('hidden');
      } else {
        emailHelp.classList.remove('hidden');
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!email.validity.valid) {
        emailHelp.classList.remove('hidden');
        email.focus();
        return;
      }
      // For demo: show a simple success message (you can wire a backend or email service)
      alert('Thanks — we will contact you soon!');
      form.reset();
    });
  }

  // Smooth scroll for anchor links (prefers-reduced-motion respected)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
});
