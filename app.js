document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchend', (e) => {
      e.preventDefault();
      toggleMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    const items = tickerTrack.querySelectorAll('.ticker-item');
    const clone = Array.from(items).map(item => item.cloneNode(true));
    clone.forEach(node => tickerTrack.appendChild(node));
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleFormSubmit(formId, fields) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const values = {};
      let valid = true;

      fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (!el) return;
        values[field.name] = el.value.trim();
        if (field.required && !values[field.name]) {
          valid = false;
        }
      });

      if (!valid) {
        showToast('Please fill in all required fields.');
        return;
      }

      if (values.email && !validateEmail(values.email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      showToast('Thank you! Your inquiry has been submitted. We will respond within 48 hours.');
      form.reset();
    });
  }

  handleFormSubmit('contactForm', [
    { id: 'name', name: 'name', required: true },
    { id: 'email', name: 'email', required: true },
    { id: 'phone', name: 'phone', required: false },
    { id: 'interest', name: 'interest', required: false },
    { id: 'message', name: 'message', required: true }
  ]);

  handleFormSubmit('contactForm2', [
    { id: 'name2', name: 'name', required: true },
    { id: 'email2', name: 'email', required: true },
    { id: 'phone2', name: 'phone', required: false },
    { id: 'interest2', name: 'interest', required: false },
    { id: 'meetingDate', name: 'meetingDate', required: false },
    { id: 'message2', name: 'message', required: true }
  ]);

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
});
