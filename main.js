// Navbar Toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.nav-menu');

navbarToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Hero Slider
const slides = document.querySelectorAll('.hero-slider img');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Modal Handling
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Project Modals
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openModal(`projectModal-${projectId}`);
    });
});

// Project Gallery Thumbnails
document.querySelectorAll('.project-gallery .thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const mainImage = thumbnail.parentElement.previousElementSibling;
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
    });
});

// Form Submission with WhatsApp
document.querySelectorAll('#quoteForm, #contactForm').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message'),
            budget: formData.get('budget') || 'Not specified',
            timeline: formData.get('timeline') || 'Not specified'
        };

        try {
            // Send to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Google Analytics Event
                gtag('event', 'form_submission', {
                    event_category: 'Form',
                    event_label: form.id === 'quoteForm' ? 'Get a Quote' : 'Contact Form'
                });

                // Send to WhatsApp
                const whatsappMessage = `Hi Afreach, I'm reaching out for ${data.service} service. Name: ${data.name}, Email: ${data.email}, Message: ${data.message}, Budget: ${data.budget}, Timeline: ${data.timeline}`;
                const whatsappUrl = `https://wa.me/254703579059?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');

                form.reset();
                closeModal(form.id === 'quoteForm' ? 'quoteModal' : 'contactForm');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = form.id === 'quoteForm' ? 'Send Quote' : 'Send Message';
        }
    });
});

// Enhanced PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('PWA install prompt ready');
    // Optional: Show custom install button
    const installBtn = document.createElement('button');
    installBtn.textContent = 'Install Afreach Creatives App';
    installBtn.className = 'btn btn-primary install-btn';
    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted PWA install');
            }
            deferredPrompt = null;
        });
    });
    document.body.appendChild(installBtn);
});

// Hide preloader
window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
});
