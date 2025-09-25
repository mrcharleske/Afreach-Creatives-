// Afreach Creatives Main JavaScript
// Version: 2025-09-25

// Navigation Toggle for Mobile
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
  });
}

// Quote Modal Functionality
const quoteModal = document.getElementById('quoteModal');
const quoteButtons = document.querySelectorAll('[id^="quoteBtnTop"], .btn[href="#"]');
const closeModal = document.getElementById('closeModal');
const quoteForm = document.getElementById('quoteForm');
const quoteFormError = document.getElementById('quoteFormError');

function openQuoteFor(service) {
  if (quoteModal) {
    quoteModal.setAttribute('aria-hidden', 'false');
    quoteModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const serviceSelect = quoteForm.querySelector('select[name="service"]');
    if (serviceSelect && service) {
      serviceSelect.value = service;
    }
    quoteModal.querySelector('input[name="name"]').focus();
  }
}

if (quoteButtons.length > 0) {
  quoteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const service = button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || '';
      openQuoteFor(service);
    });
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    if (quoteModal) {
      quoteModal.setAttribute('aria-hidden', 'true');
      quoteModal.style.display = 'none';
      document.body.style.overflow = '';
      if (quoteFormError) {
        quoteFormError.setAttribute('hidden', '');
      }
    }
  });
}

// Close Modal on Outside Click
if (quoteModal) {
  quoteModal.addEventListener('click', (e) => {
    if (e.target === quoteModal) {
      quoteModal.setAttribute('aria-hidden', 'true');
      quoteModal.style.display = 'none';
      document.body.style.overflow = '';
      if (quoteFormError) {
        quoteFormError.setAttribute('hidden', '');
      }
    }
  });
}

// Form Validation
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    const name = quoteForm.querySelector('input[name="name"]').value.trim();
    const email = quoteForm.querySelector('input[name="_replyto"]').value.trim();
    const phone = quoteForm.querySelector('input[name="phone"]').value.trim();
    const service = quoteForm.querySelector('select[name="service"]').value;
    const recaptcha = quoteForm.querySelector('.g-recaptcha-response')?.value;

    if (!name || !email || !phone || !service || !recaptcha) {
      e.preventDefault();
      if (quoteFormError) {
        quoteFormError.removeAttribute('hidden');
      }
    }
  });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const contactFormError = document.getElementById('contactFormError');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="_replyto"]').value.trim();
    const phone = contactForm.querySelector('input[name="phone"]').value.trim();
    const service = contactForm.querySelector('select[name="service"]').value;
    const recaptcha = contactForm.querySelector('.g-recaptcha-response')?.value;

    if (!name || !email || !phone || !service || !recaptcha) {
      e.preventDefault();
      if (contactFormError) {
        contactFormError.removeAttribute('hidden');
      }
    }
  });
}
