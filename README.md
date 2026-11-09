# React + Vite

## Wedding entrance

- Photos live in `public/couple/`; the final invitation uses `jainam-shalvi-couple.webp` in `ScrollEntrance` (`src/App.jsx`). The copies are upright, resized and stripped of EXIF metadata.
- Palace art is `public/entrance/palace.svg`. Its opening (480,240–720,630 in the 1200×700 viewBox) must match `DOORWAY` and the door paths in `PalaceGate` in `src/App.jsx`.
- Scroll thresholds live in `src/entranceTimeline.js`. The dance is `public/media/our-dance.mp4` (cropped from the original film to remove the corner watermark, muted, ~1.3 MB) with `our-dance-poster.webp`; swap these files to change it. Reduced motion skips the film and shows a static invitation.
- Story chapters, couple profiles and family details are plain data in `INITIAL_CMS_DATA` at the top of `src/App.jsx`.

Run `npm run check` for the timeline tests, `npm run lint` for lint, and `npm run build` for a production build.
The optional `scripts/entrance.browser-check.mjs` validates the mobile flow in Chrome. With Playwright installed in your tooling environment, run the site on port 5199, then run:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node scripts/entrance.browser-check.mjs
```

Use `TEST_URL` for a different local URL and `SHOT_DIR` to save review screenshots. The script covers normal scrolling, pause/resume, skip, natural completion, replay, keyboard focus, deep links, music, four viewport sizes, and live reduced-motion changes.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
