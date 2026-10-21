'use strict';

(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let hasSavedTheme = false;
  try { hasSavedTheme = ['light', 'dark'].includes(localStorage.getItem('ali-aqeel-theme')); } catch { /* Private browsing can block storage. */ }

  const updateTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#141a17' : '#f5f5ef';
  };
  updateTheme(root.dataset.theme || 'light');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    updateTheme(theme);
    hasSavedTheme = true;
    try { localStorage.setItem('ali-aqeel-theme', theme); } catch { /* The toggle still works for this visit. */ }
  });
  systemTheme.addEventListener('change', (event) => {
    if (!hasSavedTheme) updateTheme(event.matches ? 'dark' : 'light');
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  const mobileQuery = window.matchMedia('(max-width: 800px)');
  const navLinks = [...navigation.querySelectorAll('a')];
  navigation.classList.add('enhanced');
  menuButton.hidden = false;

  const setMenu = (open, restoreFocus = false) => {
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) navLinks[0].focus();
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navLinks.forEach((link) => link.addEventListener('click', () => {
    setMenu(false);
    // Move focus to the destination so it never stays in a collapsed menu.
    const section = document.querySelector(link.hash);
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  document.addEventListener('focusin', (event) => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  mobileQuery.addEventListener('change', () => {
    const focusWasInNav = navigation.contains(document.activeElement);
    setMenu(false, mobileQuery.matches && focusWasInNav);
    if (!mobileQuery.matches && document.activeElement === menuButton) navLinks[0].focus();
  });

  // Track all content sections so navigation remains accurate around long sections.
  const sections = [...document.querySelectorAll('main > section')];
  let scrollQueued = false;
  const updateActiveSection = () => {
    const marker = window.innerHeight * 0.3;
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section.id;
    }
    navLinks.forEach((link) => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollQueued = false;
  };
  const queueScrollUpdate = () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateActiveSection); }
  };
  window.addEventListener('scroll', queueScrollUpdate, { passive: true });
  window.addEventListener('resize', queueScrollUpdate, { passive: true });
  updateActiveSection();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach((element) => {
      element.classList.add('is-pending');
      observer.observe(element);
    });
    reducedMotion.addEventListener('change', (event) => {
      if (event.matches) {
        observer.disconnect();
        document.querySelectorAll('.is-pending').forEach((element) => element.classList.remove('is-pending'));
      }
    });
  }

  // Frontend preview only: no network request, storage, endpoint, or delivery claim.
  const form = document.querySelector('#contact-form');
  const fields = [...form.querySelectorAll('input, textarea')];
  const status = document.querySelector('#form-status');
  const sendButton = document.querySelector('#send-button');
  const validateField = (field) => {
    const value = field.value.trim();
    let error = '';
    if (!value) error = `Please enter ${field.name === 'name' ? 'your full name' : field.name === 'email' ? 'your email address' : 'a message'}.`;
    else if (field.type === 'email' && field.validity.typeMismatch) error = 'Please enter a valid email address.';
    else if (field.minLength > 0 && value.length < field.minLength) error = `Please enter at least ${field.minLength} characters.`;
    else if (field.maxLength > 0 && value.length > field.maxLength) error = `Please use no more than ${field.maxLength} characters.`;
    document.getElementById(field.getAttribute('aria-describedby')).textContent = error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
  };
  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      status.textContent = '';
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });
  const previewSubmission = (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !validateField(field));
    if (invalid.length) {
      status.textContent = 'Please review the highlighted fields. This form is a preview and cannot send messages.';
      invalid[0].focus();
      return;
    }
    status.textContent = 'Submissions are not active. Your message has not been sent or stored. You can connect using the profile links.';
  };
  // Keep type="button": even with JS unavailable, the control cannot submit data.
  sendButton.addEventListener('click', previewSubmission);
  form.addEventListener('submit', previewSubmission);
  sendButton.disabled = false;
  document.querySelector('#copyright-year').textContent = new Date().getFullYear();
})();
