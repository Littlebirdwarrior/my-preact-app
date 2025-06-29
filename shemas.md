# Organisation des fichiers pour l'application preact-portfolio

Voici la structure des fichiers de l'application preact-portfolio, décrivant l'emplacement et le rôle de chaque fichier et dossier.

```
preact-portfolio/
├── public/
│   └── index.html               # Fichier HTML principal
├── src/
│   ├── components/              # Composants React réutilisables
│   │   ├── Header.jsx           # Composant d'en-tête
│   │   ├── Hero.jsx             # Composant de la section Hero
│   │   ├── Carousel.jsx         # Composant du carousel d'images
│   │   ├── Playground.jsx        # Composant pour les espaces de démonstration
│   │   └── Layout.jsx            # Composant de mise en page
│   ├── hooks/                   # Hooks personnalisés
│   │   └── useMousePosition.js   # Hook pour la position de la souris
│   ├── App.jsx                   # Composant racine de l'application
│   ├── main.jsx                  # Fichier d'entrée de l'application
│   └── styles/                  # Feuilles de style
│       └── global.css            # Styles globaux de l'application
├── vite.config.js               # Configuration de Vite
├── package.json                 # Dépendances et scripts du projet
└── README.md                   # Documentation du projet
```

## Détails des composants

- **Header.jsx** : Contient le code pour l'en-tête de l'application, y compris le logo et la navigation.
- **Hero.jsx** : Gère l'affichage de la section Hero, avec le titre et le sous-titre.
- **Carousel.jsx** : Implémente le carousel d'images pour les projets.
- **Playground.jsx** : Permet d'afficher des extraits de code et des démonstrations interactives.
- **Layout.jsx** : Définit la mise en page générale de l'application, y compris l'en-tête et le pied de page.

## Détails des hooks

- **useMousePosition.js** : Un hook personnalisé pour suivre la position de la souris dans l'application.

## Détails des styles

- **global.css** : Contient les styles CSS globaux appliqués à toute l'application.

## Autres fichiers

- **vite.config.js** : Fichier de configuration pour l'outil de construction Vite.
- **package.json** : Liste des dépendances du projet et des scripts utiles pour le développement et la construction.
- **README.md** : Documentation du projet, y compris les instructions d'installation et d'utilisation.
