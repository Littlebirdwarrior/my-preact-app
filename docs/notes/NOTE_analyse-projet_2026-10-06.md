# Analyse du projet — my-preact-app

Portfolio personnel en single-page app, construit avec **Preact + Vite**, déployé sur GitHub Pages à l'adresse `https://Littlebirdwarrior.github.io/my-preact-app/`.

## Stack et commandes

- Gestionnaire de paquets : **pnpm**.
- Dépendances runtime : `preact`, `preact-iso` (routage), `gh-pages` (déploiement).
- Dev : `eslint` + `eslint-config-preact` présent mais pas câblé dans un script `package.json` — à lancer manuellement via `npx eslint src`.
- Aucun test automatisé dans le projet.

Scripts clés :
- `pnpm dev` : serveur Vite.
- `pnpm build` : build de prod dans `dist/`, suivi automatiquement de `postbuild` qui copie `dist/index.html` vers `dist/404.html` (nécessaire pour que le routage SPA fonctionne sur GitHub Pages, qui ne connaît pas les routes côté client).
- `pnpm deploy` : rebuild puis publication de `dist/` sur la branche `gh-pages` via le CLI `gh-pages`.

## Structure et routage

`src/main.jsx` est le point d'entrée : il monte `<App>` avec `render()` dans `#app`. `App` enveloppe tout dans `LocationProvider`/`Router` de `preact-iso`. `Cursor` et `Header` sont rendus **hors** du `Router`, donc persistants sur toutes les routes ; seul le contenu de `<main>` change entre `Route` (`Home` sur `/`, `NotFound` en route par défaut).

Convention de dossier : `src/pages/` contient les composants de route (`Home`, `_404`), `src/components/` tout ce qui est réutilisé/composé à l'intérieur des pages (`Hero`, `Carousel`, `Header`, `Cursor`, `Playground`). `src/components/Layout.jsx` existe mais est vide — probablement un composant prévu mais pas encore utilisé.

## Points d'architecture notables

1. **Deux mécanismes de curseur coexistent, indépendants l'un de l'autre** :
   - `Cursor` + `useCustomCursor` (`src/hooks/cursorMouse.js`) : manipulation DOM directe (`querySelector`, `addEventListener` sur `mousemove`) pour déplacer un curseur custom global, avec gestion des classes `cursor-hover` et `cursor-hidden` (via la classe `.no-cursor` sur les éléments comme le carousel).
   - `useMousePosition` (`src/hooks/useMousePosition.js`) : approche React/Preact classique avec `useState`, utilisée uniquement par `Hero` pour un effet de suivi de souris local (`cursor-follow`). Ce second hook re-render à chaque mouvement de souris — contrairement au premier qui ne passe jamais par le state Preact.

   Ce sont deux implémentations différentes du même type de besoin (suivre la souris), l'une bypassant Preact, l'autre non — pas forcément un problème, mais une incohérence à garder en tête si l'un des deux est modifié.

2. **Header** : `useHeader` (`src/hooks/header.js`) manipule aussi le DOM directement (classes `hide`/`show` sur `.nav`) plutôt que de passer par du state. Le hook ne pose son listener que si la largeur initiale de la fenêtre est < 768px : au-delà, `useEffect` fait un `return` anticipé sans jamais attacher d'écouteur resize. Autrement dit, si on est en desktop au chargement puis qu'on redimensionne vers du mobile sans recharger la page, le menu ne basculera jamais dans son mode mobile (pas de media query réactive, seulement une vérification au montage).

3. **Carousel** (`src/components/Carousel.jsx`) : lit des items statiques depuis `src/data/carouselData.json` (actuellement des placeholders « Star Wars » avec images `placecats.com` — à remplacer avant mise en prod si ce n'est pas déjà prévu). Le nombre d'items visibles (1/2/3) est recalculé au resize via `window.innerWidth`, cette fois avec un vrai listener `resize` dans un `useEffect` avec cleanup — contrairement au Header, ce composant réagit bien à un redimensionnement en cours de session.

4. **Styles** : CSS découpé par domaine dans `src/css/` (`reset`, `root`, `header`, `hero`, `carousel`, `cursor`, `pretzel`), chacun importé individuellement plutôt que via une feuille globale unique. `src/style.css` est le point d'entrée importé dans `main.jsx`.

5. **Alias de chemins** : `jsconfig.json` alias `react`/`react-dom` vers `preact/compat` — c'est uniquement pour le confort de l'outillage éditeur (autocomplétion), la vraie gestion JSX par Vite passe par `@preact/preset-vite` dans `vite.config.js`, indépendamment de ce fichier.

6. **Base path** : `vite.config.js` fixe `base: '/my-preact-app/'`, nécessaire pour que les assets et le routage se résolvent correctement une fois déployés sous un sous-chemin GitHub Pages (plutôt qu'à la racine d'un domaine).

## Composant isolé : Playground

`src/components/Playground.jsx` existe dans `src/components/` mais n'est importé nulle part (ni dans `Home`, ni dans `main.jsx`). D'après le lien du menu (`#playground` dans `Header.jsx`), il est probablement prévu pour une future section de la page d'accueil, mais pas encore intégré.

## Pistes d'attention pour la suite

- `Layout.jsx` et `Playground.jsx` sont présents mais inutilisés — à intégrer ou à retirer si abandonnés.
- Le lien `#playground` dans le header pointe vers une ancre qui n'existe pas encore dans le DOM (puisque `Playground` n'est pas rendu).
- Les données du carousel sont des textes de remplissage (citations Star Wars) — à remplacer par du contenu réel de portfolio.
- Pas de script `lint` dans `package.json` malgré la config ESLint présente — pourrait être ajouté si des vérifications régulières sont souhaitées.
- Comportement du menu mobile (`useHeader`) non réactif à un resize après le montage initial — à corriger si le cas d'usage (redimensionner la fenêtre sans recharger) est jugé important.
