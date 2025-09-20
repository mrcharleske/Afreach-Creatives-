/* Hero Slider */
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
  if (slides.length) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
}
if (slides.length) setInterval(showNextSlide, 5000);

/* Navigation Toggle */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('show');
  });
}

/* Quote Modal */
const modal = document.getElementById('quoteModal');
const quoteForm = document.getElementById('quoteForm');
const contactForm = document.getElementById('contactForm');
const modalClose = document.getElementById('closeModal');
const quoteButtons = [
  document.getElementById('openQuote'),
  document.getElementById('openQuoteHero'),
  document.getElementById('openQuoteAbout')
].filter(btn => btn);

function openModal() {
  if (modal) modal.style.display = 'block';
}

function closeModal() {
  if (modal) modal.style.display = 'none';
}

quoteButtons.forEach(btn => {
  btn.addEventListener('click', openModal);
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
}

/* Form Submission */
[quoteForm, contactForm].forEach(form => {
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      try {
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          alert('Thank you! We’ll contact you shortly.');
          this.reset();
          closeModal();
          const msg = `Hello Afreach Creatives, I sent a ${this.id === 'quoteForm' ? 'quote' : 'contact'} request.\nName: ${formData.get('name')}\nEmail: ${formData.get('email')}\n${this.id === 'quoteForm' ? `Service: ${formData.get('service') || 'N/A'}\nProject: ${formData.get('project')}` : `Subject: ${formData.get('subject') || 'N/A'}\nMessage: ${formData.get('message')}`}`;
          window.open(`https://wa.me/254703579059?text=${encodeURIComponent(msg)}`, '_blank');
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        alert('Error submitting form. Please check your connection.');
      }
    });
  }
});

/* Dynamic Copyright Year */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
