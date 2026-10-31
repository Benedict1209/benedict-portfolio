# Benedict Naldo — Developer Portfolio

A production-ready personal portfolio for Benedict Naldo P, an MCA student and aspiring software developer focused on Python, web development, and machine learning.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React and custom brand icons
- Local variable fonts via Fontsource

## Run locally

```bash
npm install
npm run dev
```

Vite will print the local development URL, usually `http://localhost:5173`.

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` runs the TypeScript project check first, then creates the optimized production bundle in `dist/`.

## Project structure

```text
public/
  favicon.svg
  og-image.png
  resume/Benedict-Naldo-Resume.pdf
src/
  components/
    ui/
    About.tsx
    Certifications.tsx
    Contact.tsx
    Education.tsx
    Experience.tsx
    Footer.tsx
    Hero.tsx
    Navbar.tsx
    ProjectVisuals.tsx
    Projects.tsx
    Skills.tsx
  lib/site.ts
  App.tsx
  index.css
  main.tsx
```

## Content and assets

- Shared contact information, navigation, and education data live in `src/lib/site.ts`.
- The downloadable resume is a local PDF at `public/resume/Benedict-Naldo-Resume.pdf`.
- The social preview image is at `public/og-image.png`.
- Project cards intentionally do not include repository buttons because no verified project repository URLs were provided. Add a link only when a public repository exists.

## Contact form

The form validates each field on the client and then opens the visitor's email app with a prefilled message using a `mailto:` link. It does not send or store data. The confirmation state clearly tells the visitor that no message has been transmitted by the website.
