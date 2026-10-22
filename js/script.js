'use strict';

(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');

  const updateTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#09090b' : '#dedee2';
  };
  updateTheme(root.dataset.theme || 'dark');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    updateTheme(theme);
    try { localStorage.setItem('ali-aqeel-theme', theme); } catch { /* The toggle still works for this visit. */ }
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

  // Cache section geometry on layout changes. Scroll updates only the active
  // navigation state; the decorative background grid is entirely static CSS.
  const sections = [...document.querySelectorAll('main > section')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let sectionPositions = [];
  let viewportHeight = window.innerHeight;
  let latestScroll = window.scrollY;
  let frameId = 0;
  let measureId = 0;
  let activeSection = '';

  const updateActiveSection = () => {
    const marker = latestScroll + viewportHeight * 0.3;
    let current = sections[0].id;
    for (const section of sectionPositions) {
      if (section.top <= marker) current = section.id;
    }
    if (current === activeSection) return;
    activeSection = current;
    navLinks.forEach((link) => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const renderFrame = () => {
    frameId = 0;
    updateActiveSection();
  };

  const requestFrame = () => {
    if (!frameId && !document.hidden) frameId = requestAnimationFrame(renderFrame);
  };
  const measureLayout = () => {
    measureId = 0;
    latestScroll = window.scrollY;
    viewportHeight = window.innerHeight;
    sectionPositions = sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top + latestScroll }));
    requestFrame();
  };
  const requestMeasurement = () => {
    if (!measureId && !document.hidden) measureId = requestAnimationFrame(measureLayout);
  };
  window.addEventListener('scroll', () => {
    latestScroll = window.scrollY;
    requestFrame();
  }, { passive: true });
  window.addEventListener('resize', requestMeasurement, { passive: true });
  window.addEventListener('pageshow', requestMeasurement);
  if (typeof ResizeObserver === 'function') new ResizeObserver(requestMeasurement).observe(document.body);
  else window.addEventListener('load', requestMeasurement);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(measureId);
      frameId = measureId = 0;
    } else requestMeasurement();
  });
  measureLayout();

  if (typeof IntersectionObserver === 'function' && !reducedMotion.matches) {
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
