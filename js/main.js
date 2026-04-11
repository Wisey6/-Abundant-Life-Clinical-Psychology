/* ============================================
   ABUNDANT LIFE CLINICAL PSYCHOLOGY
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initFaqAccordion();
  initScrollAnimations();
  initActiveNavLink();
  initContactForm();
  initParallax();
  initFloatingElements();
  initAuroraAnimation();
});

/* --- Sticky Header --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');

    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';

    hamburger.setAttribute('aria-expanded', !isOpen);
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  }

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('active');

      if (!isActive) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
}

/* --- Scroll Animations (Intersection Observer) --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));
}

/* --- Active Nav Link --- */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Match exact page or index
    if (
      href === currentPath ||
      (currentPath.endsWith('/') && href === 'index.html') ||
      (currentPath.endsWith(href))
    ) {
      link.classList.add('active');
    }
  });
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    let valid = true;

    [name, email, message].forEach(field => {
      if (field && !field.value.trim()) {
        field.style.borderColor = '#c44';
        valid = false;
      } else if (field) {
        field.style.borderColor = '';
      }
    });

    if (email && email.value && !isValidEmail(email.value)) {
      email.style.borderColor = '#c44';
      valid = false;
    }

    if (valid) {
      const successMsg = form.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.add('show');
      }
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        if (successMsg) successMsg.classList.remove('show');
      }, 5000);
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --- Parallax Scrolling (Premium Effect) --- */
function initParallax() {
  const heroes = document.querySelectorAll('.hero');
  if (!heroes.length) return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  window.addEventListener('scroll', () => {
    heroes.forEach(hero => {
      const rect = hero.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      if (scrollPercent > -0.5 && scrollPercent < 1.5) {
        const yOffset = scrollPercent * 40 - 20; // 20% parallax movement
        const bg = hero.querySelector('.hero__bg');
        if (bg) {
          bg.style.transform = `translateY(${yOffset * 0.2}px)`;
        }
      }
    });
  }, { passive: true });
}

/* --- Floating Elements Animation --- */
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('[data-float]');
  if (!floatingElements.length) return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  floatingElements.forEach((el, index) => {
    const delay = index * 0.1;
    el.style.animationDelay = `${delay}s`;
  });
}

/* --- Aurora Animation (Canvas-based) --- */
function initAuroraAnimation() {
  const canvas = document.getElementById('auroraAnimationCanvas');
  const container = document.getElementById('auroraCanvas');

  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Warm color palette for aurora
  const colors = [
    { r: 44, g: 110, b: 113 },   // Teal
    { r: 201, g: 123, b: 92 },   // Terracotta
    { r: 232, g: 166, b: 137 },  // Light terracotta
  ];

  let time = 0;
  let animationId = 0;

  function resizeCanvas() {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function noise(x, y, t) {
    return Math.sin(x * 0.01) * Math.cos(y * 0.01) * Math.sin(t * 0.001) +
           Math.sin((x + t * 0.1) * 0.005) * 0.5;
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.5;

    const width = canvas.width;
    const height = canvas.height;

    // Clear with transparency
    ctx.clearRect(0, 0, width, height);

    // Draw flowing aurora waves
    for (let wave = 0; wave < 3; wave++) {
      const waveOffset = wave * 0.3;
      const baseY = height * (0.3 + wave * 0.15);

      ctx.beginPath();
      ctx.moveTo(0, baseY);

      for (let x = 0; x <= width; x += 5) {
        const n = noise(x, baseY + waveOffset * 100, time);
        const y = baseY + Math.sin((x + time * 0.05) * 0.01) * 40 + n * 30;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const color = colors[(wave + Math.floor(time * 0.001)) % colors.length];
      const alpha = 0.15 + 0.1 * Math.sin(time * 0.002 + wave);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      ctx.fill();
    }

    // Add glow effect
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(44, 110, 113, 0.1)');
    gradient.addColorStop(0.5, 'rgba(201, 123, 92, 0.05)');
    gradient.addColorStop(1, 'rgba(232, 166, 137, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  animate();

  // Cleanup on page change (SPA scenario)
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resizeCanvas);
  };
}
