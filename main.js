// Navbar Toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navbarToggle && navMenu) {
    navbarToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
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

// Form Submission with WhatsApp
document.querySelectorAll('#quoteForm').forEach(form => {
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
                    event_label: 'Get a Quote'
                });

                const whatsappMessage = `Hi Afreach, I'm reaching out for ${data.service} service. Name: ${data.name}, Email: ${data.email}, Message: ${data.message}, Budget: ${data.budget}, Timeline: ${data.timeline}`;
                const whatsappUrl = `https://wa.me/254703579059?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');

                form.reset();
                closeModal('quoteModal');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Quote';
        }
    });
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
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
    const installBtn = document.createElement('button');
    installBtn.textContent = 'Install Afreach Creatives App';
    installBtn.className = 'btn btn-primary install-btn';
    installBtn.style.position = 'fixed';
    installBtn.style.top = '20px';
    installBtn.style.right = '20px';
    installBtn.style.zIndex = '1000';
    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User installed PWA');
            }
            deferredPrompt = null;
            installBtn.remove();
        });
    });
    document.body.appendChild(installBtn);
});

// Hide Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').style.display = 'none';
    }, 300); // Faster
});
