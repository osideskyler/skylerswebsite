# Skyler Smith Portfolio

A static-first portfolio built with `Next.js`, `TypeScript`, `Tailwind CSS`, `shadcn/ui` patterns, and `Framer Motion`.

## Local Development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Content Updates

Most ongoing edits should happen in `content/site-data.ts`.

This file controls:

- hero copy and contact links
- featured project case studies
- smaller projects
- experience and education
- skills and interests

## Resume

The downloadable resume is stored at:

- `public/resume/skyler-smith-resume-2026.pdf`

Replace that file when you want to publish a newer version.

## Adding Photos and Videos

The layouts are ready for real media. Recommended folders:

- `public/images/about`
- `public/images/projects/trust-scores`
- `public/images/projects/redo`
- `public/images/projects/ella-rises`
- `public/videos/projects/trust-scores`
- `public/videos/projects/redo`
- `public/videos/projects/ella-rises`

After adding files, update the `src` values in `content/site-data.ts`.

Examples:

```ts
{
  type: "image",
  src: "/images/projects/trust-scores/dashboard-hero.jpg",
  alt: "Trust Scores dashboard screenshot",
  caption: "Verification flow overview.",
  placeholder: "Hero screenshot slot"
}
```

```ts
{
  type: "video",
  src: "/videos/projects/redo/claims-walkthrough.mp4",
  poster: "/images/projects/redo/claims-poster.jpg",
  alt: "Redo walkthrough video",
  caption: "Short product walkthrough.",
  placeholder: "Internal tool walkthrough slot"
}
```

## Deployment

This project is configured for static export via `next.config.mjs`.

Build output:

```bash
npm run build
```

The static site will be generated in `out/`.

Recommended low-cost AWS setup:

1. Create an `S3` bucket for the static files.
2. Upload the contents of `out/` to the bucket.
3. Put `CloudFront` in front of the bucket for HTTPS, caching, and custom domain support.
4. Point your domain through `Route 53`.

## Notes

- The homepage is the primary recruiter experience.
- Each flagship project has its own static case study page.
- The design intentionally supports missing media gracefully, so you can polish the content over time without breaking the layout.
