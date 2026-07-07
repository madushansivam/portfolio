# Madushan Samayasivam — Portfolio

Personal portfolio site for Madushan Samayasivam — DevOps Engineer & Frontend Developer based in Badulla, Sri Lanka.

**Live:** https://madushansivam.github.io/portfolio/

## Stack

- Vanilla JavaScript (no framework, no build step)
- GSAP + Draggable — project slider, scroll reveals
- Three.js — hero canvas scene
- Hand-rolled CSS (no framework)

## Structure

```
.
├── index.html      # all markup + sections
├── script.js       # slider, animations, form handling, ambient audio synth
├── style.css       # all styling
├── sitemap.xml
├── robots.txt
└── assets/         # project screenshots, profile photo, resume PDF
```

## Running locally

No build step. Just serve the folder:

```bash
python3 -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000`.

## Deploying

Pushed to `main` → served automatically via GitHub Pages at
`https://madushansivam.github.io/portfolio/`.

## Contact

madushansivam@gmail.com · [LinkedIn](https://linkedin.com/in/madushansivam) · [GitHub](https://github.com/madushansivam)
