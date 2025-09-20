// HERO SLIDER
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(showNextSlide, 5000);

// QUOTE MODAL
const modal = document.getElementById("quoteModal");
const btns = [document.getElementById("openQuote"), document.getElementById("openQuoteHero")];
const span = document.querySelector(".modal .close");

btns.forEach(btn => {
  if (btn) btn.onclick = () => modal.style.display = "block";
});
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

// FORMSPREE HANDLER
const quoteForm = document.getElementById("quoteForm");
if (quoteForm) {
  quoteForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    let formData = new FormData(this);

    await fetch(this.action, {
      method: this.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    alert("Thank you! We'll contact you shortly.");
    modal.style.display = "none";
    this.reset();
    
    // WhatsApp Forward
    let msg = `Hello Afreach Creatives, I just sent a quote request.\nName: ${formData.get("name")}\nPhone: ${formData.get("phone")}\nProject: ${formData.get("project")}`;
    window.open(`https://wa.me/254703579059?text=${encodeURIComponent(msg)}`, "_blank");
  });
}
