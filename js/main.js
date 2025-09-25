// main.js — small, independent vanilla JS file
document.addEventListener('DOMContentLoaded', function(){
  // Modal handling
  var modal = document.getElementById('quoteModal');
  var openBtns = document.querySelectorAll('#quoteBtnTop, #quoteBtnHero, #quoteBtnTop2, #quoteBtnTop3, #quoteBtnTop4, #quoteBtnTop5');
  var closeBtn = document.getElementById('closeModal');
  var form = document.getElementById('quoteForm');

  openBtns.forEach(function(b){
    if(b) b.addEventListener('click', openModal);
  });
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });

  function openModal(){ if(modal){ modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; } }
  function closeModal(){ if(modal){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow='auto'; } }

  // openQuoteFor(service) available globally
  window.openQuoteFor = function(service){
    openModal();
    setTimeout(function(){
      var sel = document.querySelector('#quoteForm select[name="service"]');
      if(sel){ sel.value = service; sel.focus(); }
    }, 250);
  };

  // Quote form submit: sends to Formspree and then opens WhatsApp prefilled (user must confirm send)
  if(form){
    form.addEventListener('submit', function(e){
      // Basic client-side check for reCAPTCHA (if present)
      var rec = document.querySelector('.g-recaptcha-response');
      if(rec && rec.value === ""){
        // If reCAPTCHA not completed, let reCAPTCHA handle or prevent
        // Most likely user will tick captcha; allow default.
      }
      // Let the form submit naturally (Formspree will handle). After submit, open WhatsApp window
      // To enhance UX: intercept and send fetch, then open whatsapp — but we'll let default submit proceed because of Formspree redirect.
      // We'll instead listen for form submission and open WhatsApp after a small delay
      var service = (form.querySelector('select[name="service"]') || {}).value || 'General';
      var name = (form.querySelector('input[name="name"]') || {}).value || 'Client';
      var msg = encodeURIComponent('Hello Afreach, can I learn more about ' + service + ' — from: ' + name);
      // Open WhatsApp in new tab (user must press SEND in WhatsApp):
      window.open('https://wa.me/254703579059?text=' + msg, '_blank');
      // Allow default submit to proceed
    });
  }

  // Contact form separate handling (contact page)
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(){
      var service = 'General enquiry';
      var nameElem = contactForm.querySelector('input[name="name"]');
      var name = (nameElem && nameElem.value) ? nameElem.value : 'Client';
      var msg = encodeURIComponent('Hello Afreach, a new contact from ' + name + ' (contact form)');
      window.open('https://wa.me/254703579059?text=' + msg, '_blank');
      // Let default submit proceed to Formspree
    });
  }

  // Simple hero image rotation (no dependency)
  var heroImgs = document.querySelectorAll('.hero-img');
  if(heroImgs.length > 1){
    var i=0;
    setInterval(function(){
      heroImgs.forEach(function(img,idx){ img.style.display = idx === i ? 'block' : 'none'; });
      i = (i+1) % heroImgs.length;
    }, 3500);
  }
});
