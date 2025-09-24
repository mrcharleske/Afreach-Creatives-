// Navbar Toggle
function toggleNav() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

const navbarToggle = document.querySelector('.navbar-toggle');
if (navbarToggle) {
    navbarToggle.addEventListener('click', toggleNav);
}

// Modal Handling
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
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
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                gtag('event', 'form_submission', {
                    event_category: 'Form',
                    event_label: form.id === 'quoteForm' ? 'Get a Quote' : 'Contact Form'
                });

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

// Portfolio Gallery
function setMainImage(src, alt) {
    const mainImage = document.querySelector('.project-gallery .main-image');
    if (mainImage) {
        mainImage.src = src;
        mainImage.alt = alt;
    }
}

// Instant Preloader Hide
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
});
