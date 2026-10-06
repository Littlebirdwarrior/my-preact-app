# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A personal portfolio single-page app built with Preact + Vite, deployed to GitHub Pages at `https://Littlebirdwarrior.github.io/my-preact-app/`.

## Commands

Package manager is pnpm (see `pnpm-lock.yaml`).

- `pnpm dev` — start Vite dev server
- `pnpm build` — production build to `dist/` (runs `postbuild` after, which copies `dist/index.html` to `dist/404.html` for GitHub Pages SPA routing)
- `pnpm preview` — preview the production build locally
- `pnpm deploy` — build (via `predeploy`) and publish `dist/` to the `gh-pages` branch via `gh-pages` CLI

There is no test suite and no lint script wired into `package.json` (ESLint config `eslint-config-preact` is present as a devDependency but must be invoked directly, e.g. `npx eslint src`).

## Architecture

- **Routing**: `src/main.jsx` renders `<App>` into `#app`, wrapping everything in `preact-iso`'s `LocationProvider`/`Router`. `Header` and `Cursor` are rendered outside the `Router` so they persist across routes; only the `<main>` content switches between `Route` components (`src/pages/Home/home.jsx`, `src/pages/_404.jsx`).
- **Pages vs components**: `src/pages/` holds route-level components; `src/components/` holds everything reused/composed within pages (`Hero`, `Carousel`, `Header`, `Cursor`, `Playground`). `src/components/Layout.jsx` exists but is currently empty/unused.
- **Custom cursor**: `Cursor` (component) + `useCustomCursor` (`src/hooks/cursorMouse.js`) implement a global custom cursor via direct DOM manipulation (querySelector/addEventListener on `mousemove`, `.no-cursor`, and hoverable elements) rather than Preact state — this runs independently of the mouse-follow effect in `Hero`, which uses the separate `useMousePosition` hook (state-driven, re-renders on every mousemove). Elements/sections that should suppress the custom cursor (e.g. the carousel) get a `no-cursor` class.
- **Header nav toggle**: `useHeader` (`src/hooks/header.js`) manipulates `.nav` classes (`hide`/`show`) directly via the DOM based on a `.nav-toogle` click listener and an initial `window.innerWidth` check, rather than Preact state.
- **Carousel**: `Carousel` (`src/components/Carousel.jsx`) reads static items from `src/data/carouselData.json` and computes visible-item count responsively from `window.innerWidth` (1 item <768px, 2 <1024px, 3 otherwise), recalculated on resize.
- **Styling**: plain CSS per concern under `src/css/` (`reset.css`, `root.css`, `header.css`, `hero.css`, `carousel.css`, `cursor.css`, `pretzel.css`), imported individually rather than through a single global stylesheet; `src/style.css` is the top-level entry imported in `main.jsx`.
- **Path aliases**: `jsconfig.json` aliases `react`/`react-dom` to `preact/compat` and sets `jsxImportSource: preact` — this is a jsconfig-only convenience for editor tooling, Vite's own Preact JSX handling comes from `@preact/preset-vite` in `vite.config.js`.
- **Base path**: `vite.config.js` sets `base: '/my-preact-app/'` to match the GitHub Pages project path — required for assets/routing to resolve correctly when deployed.

## Notes

- Source comments and commit messages in this repo are in French; follow that convention when editing existing files with French comments.
- `copilot.config.js` configures GitHub Copilot specifically (French responses, JSDoc-before-code, line-by-line comments) — this does not apply to Claude Code; follow the global comment conventions instead (comments only where genuinely non-obvious).

## Documentation workflow

All Markdown files produced by Claude Code go under `docs/`, split by type:

- `docs/specs/SPEC_<sujet>_<date>.md` — specs
- `docs/notes/NOTE_<sujet>_<date>.md` — notes

`<date>` format: `YYYY-MM-DD`. Communication with the user in this repo is in French.

`docs/CORRECTIF.md` is separate from the specs/notes convention above: after a change is made, append a short paragraph there summarizing what was modified (a running changelog, not dated/sujet-named files).
