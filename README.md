# Afreach Creatives — Static Website (GitHub Pages / PWA)

## What this repo contains
- `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`
- `css/styles.css`
- `js/main.js`
- `manifest.webmanifest`
- `sw.js`
- `images/` (place your site images here; already assumed uploaded)

## Quick setup
1. Push these files to your GitHub repository.
2. On GitHub, enable **Pages** (Settings → Pages) to serve from the `main` branch root.
3. Visit `https://<your-username>.github.io/<repo>/` or, when you configure your custom domain `afreachcreatives.com`, add the domain in Pages settings and set DNS accordingly.

## PWA
- The site supports installation in Chrome (manifest + service worker included).
- For Play Store TWA packaging later, follow Google Bubblewrap docs (not included here).

## Formspree
- Forms post to: `https://formspree.io/f/mjkedvkg`
- `thankyou.html` is set as the `_next` target after successful Formspree submit.

## Google Analytics
- GA `G-FYZL907RTJ` is included in the header.

## reCAPTCHA (Important)
- The forms include reCAPTCHA placeholders with `data-sitekey="RECAPTCHA_SITE_KEY_HERE"`.
- You must create a reCAPTCHA site key:
  1. Go to https://www.google.com/recaptcha/admin/create
  2. Choose reCAPTCHA v2 (Checkbox) or v3 and register `afreachcreatives.com` (and your GitHub Pages domain).
  3. Replace `RECAPTCHA_SITE_KEY_HERE` in all HTML files with your site key.
- If you use reCAPTCHA v2, users will tick the checkbox before submit. If you prefer invisible reCAPTCHA or server-side verification, adjust accordingly.

## WhatsApp
- The site opens WhatsApp using `https://wa.me/254703579059?text=...` with a prefilled message from the forms.

## Icons
- `manifest.webmanifest` currently uses `images/favicon.png` for PWA icons. For best results, provide dedicated `192x192` and `512x512` PNGs in `images/`.

## Notes & Next steps
- Replace `images/favicon.png` if you want dedicated icons (192/512).
- If you want the site deployed under `https://afreachcreatives.com`, set your domain DNS and add the domain in GitHub Pages settings.
- For Play Store packaging (TWA), use Bubblewrap as described in Google docs.

---

If you'd like, I can:
- Prepare a single ZIP of these files (tell me where to put it) OR
- Create a GitHub repo and push them (I will need permission / repo details).
