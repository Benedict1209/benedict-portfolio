# Benedict Naldo — Developer Portfolio

A production-ready personal portfolio for Benedict Naldo P, an MCA student and aspiring software developer focused on Python, web development, and machine learning.

- **Live website:** https://benedict-portfolio-pink.vercel.app
- **GitHub repository:** https://github.com/Benedict1209/benedict-portfolio

## Overview

The site is a single-page application built around a "Nocturne Studio" visual system: a dark editorial canvas, oversized display typography, lime and periwinkle accents, and an inverted bone-colored Contact/Footer chapter. It includes a floating navigation dock, hero, and dedicated sections for About, Skills, Projects, Experience, Education, Certifications, and Contact. It is a fully static frontend: there is no backend, database, or server-side API.

The interface is responsive, keyboard accessible, and respects `prefers-reduced-motion`.

## Technologies

- React 19 and TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React and custom brand icons
- Local variable fonts via Fontsource (Bricolage Grotesque, Manrope, Newsreader, JetBrains Mono)
- Oxlint for linting

## Installation

Requires Node.js 20 or newer and npm.

```bash
npm install
```

No environment variables are required to install, develop, or build the project.

## Local development

```bash
npm run dev
```

Vite will print the local development URL, usually `http://localhost:5173`.

Available commands:

```bash
npm run dev      # start the dev server with hot reload
npm run lint     # run Oxlint
npm run build    # type-check and create the production bundle
npm run preview  # preview the production build locally
```

## Production build

```bash
npm run build
```

`npm run build` runs the TypeScript project check first, then creates the optimized production bundle in `dist/`. The `dist/` directory is generated output and is not committed.

## Project structure

```text
public/
  favicon.svg
  og-image.png
  resume/Benedict-Naldo-Resume.pdf
src/
  components/
    ui/
      AnimatedHeading.tsx
      MagneticLink.tsx
      Marquee.tsx
      Reveal.tsx
      ScrollProgress.tsx
      SectionHeading.tsx
      SocialLinks.tsx
      SpotlightCard.tsx
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
  lib/
    content.ts
    site.ts
  App.tsx
  index.css
  main.tsx
```

## Content and assets

- Shared contact information, navigation, and education data live in `src/lib/site.ts`.
- Project, skill, and certification content lives in `src/lib/content.ts`.
- The downloadable resume is a local PDF at `public/resume/Benedict-Naldo-Resume.pdf`.
- The social preview image is at `public/og-image.png`.
- Project cards intentionally do not include repository buttons because no verified project repository URLs were provided. Add a link only when a public repository exists.

### Updating content

- **Resume:** replace `public/resume/Benedict-Naldo-Resume.pdf` with the new PDF using the same filename, or update `resume` in `src/lib/site.ts` if the path changes.
- **Images:** add files under `public/` and reference them with an absolute path such as `/images/name.png`.
- **Projects and skills:** edit the data in `src/lib/content.ts`. Custom artwork lives in `src/components/ProjectVisuals.tsx`.
- **Certifications:** edit the `certifications` array in `src/lib/content.ts`.
- **Contact details and social links:** edit `src/lib/site.ts`.

## Deployment

The project is hosted on Vercel under the free Hobby plan.

- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Automatic production deployments: enabled

Every push to `main` triggers a new production deployment. Pushes to other branches produce preview deployments.

### Update workflow

1. Pull the latest changes: `git pull origin main`.
2. Make changes locally and preview them with `npm run dev`.
3. Validate with `npm run lint` and `npm run build`.
4. Commit the changes.
5. Push to `main`: `git push origin main`.
6. Vercel detects the push, builds the project, and promotes the result to production automatically.
7. Verify the live site after the deployment finishes.

## Contact form

The form validates each field on the client and then opens a prefilled Gmail compose draft in a new tab using `gmailComposeUrl()` from `src/lib/site.ts`. It does not send or store data. The confirmation state clearly tells the visitor that no message has been transmitted by the website and offers a manual link to the draft if the new tab is blocked.

## Repository notes

- `node_modules/`, `dist/`, and local Vercel state are ignored by Git.
- Environment files such as `.env` and `.env.local` are ignored and must never be committed.
- No credentials or secrets belong in this repository.
