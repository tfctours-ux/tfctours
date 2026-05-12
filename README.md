# Flight Center

Next.js App Router marketing site for The Flight Centre Travel & Tours.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

## Deployment Notes

- Primary production domain: `https://www.tfctours.com`
- Public site URL override: `NEXT_PUBLIC_SITE_URL`
- SEO metadata, sitemap, robots, and structured data are generated from the shared site URL helpers in `src/lib/constants.ts` and `src/lib/utils.ts`
