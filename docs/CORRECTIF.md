# Correctif

## 2026-10-06 — Routage vers la page 404 au lieu de la Home

`vite.config.js` fixe `base: '/my-preact-app/'`, ce qui fait que Vite (en dev comme en prod) sert l'app sous ce sous-chemin plutôt qu'à la racine. `preact-iso` ne connaît pas ce préfixe : sa `Route path="/"` dans `src/main.jsx` ne correspondait jamais au vrai `pathname` (`/my-preact-app/`), donc le `Router` tombait systématiquement sur la route par défaut (`NotFound`). Remplacé `path="/"` par `path={import.meta.env.BASE_URL}`, qui reflète toujours le `base` configuré dans Vite, en dev comme en build. Vérifié avec Chromium headless : `http://localhost:5173/` affiche désormais bien la Home.
