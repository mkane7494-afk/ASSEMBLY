# assemblysystems.com.au

Marketing site for **Assembly Business Systems Co Pty Ltd** — static HTML, deployed on Vercel.

## Structure
- `index.html` — the landing page (markup, styles and motion script inline)
- `privacy.html` — privacy policy (served at `/privacy`)
- `assets/` — logo SVGs, product screenshots, footage (MP4 + poster frames), GSAP, ScrollTrigger and Lenis
- `og.jpg`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`
- `vercel.json` — clean URLs, caching and security headers

## Deploy
No build step. Vercel serves the repository root as-is (Framework preset: **Other**, no build command, output directory `.`).
Pushes to `main` deploy to production once the Vercel project is connected to this repo.

## Enquiry form
Submitting opens a pre-filled email to info@assemblysystems.com.au. To send enquiries straight into a form service
(for example a BuildTrack Pro form), add `data-endpoint="https://…"` to the `<form data-form="enquiry">` element.
