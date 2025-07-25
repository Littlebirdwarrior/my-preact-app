import { useEffect } from "preact/hooks"; // Importe le hook useEffect de Preact

// Hook personnalisé pour gérer un curseur custom
export function useCustomCursor() {
    useEffect(() => { // Exécute ce bloc au montage du composant
        // Récupère l'élément du DOM qui sert de curseur personnalisé (par classe)
        const customCursor = document.querySelector(".custom-cursor");
        if (!customCursor) return; // Si l'élément n'existe pas, on arrête le hook

        // Fonction pour déplacer le curseur personnalisé à la position de la souris
        const handleMouseMove = (el) => {
            const cursorSize = customCursor.clientWidth / 2; // clientWidth retourne la largeur de l'élément
            // injecte le style sur ma div custom-cursor et place à la position de la souris
            customCursor.style.left = `${el.clientX - cursorSize}px`;
            customCursor.style.top = `${el.clientY - cursorSize}px`;
        };

        // ajoute et retire la classe 'hover' au curseur custom lors du survol d'un élément interactif
        // handleMouseMove est une fonction qui sera appelée à chaque mouvement de souris
        const handleMouseEnter = () => customCursor.classList.add("cursor-hover");
        const handleMouseLeave = () => customCursor.classList.remove("cursor-hover");

        // Gestion de la visibilité du curseur custom sur les éléments .no-cursor
        const noCursorTargets = document.querySelectorAll('.no-cursor');
        const handleNoCursorEnter = () => customCursor.classList.add("cursor-hidden");
        const handleNoCursorLeave = () => customCursor.classList.remove("cursor-hidden");

        // Ajoute l'écouteur global pour déplacer le curseur personnalisé à chaque mouvement de souris
        document.addEventListener("mousemove", handleMouseMove);

        // Sélectionne tous les éléments interactifs à survoler (liens, boutons, etc.)
        const hoverTargets = document.querySelectorAll(
            'a, button, [role="button"], input[type="button"], input[type="submit"], .hover-target, .nav-toogle'
        );
        // Ajoute les écouteurs pour l'effet hover sur chaque cible
        hoverTargets.forEach((target) => {
            target.addEventListener("mouseenter", handleMouseEnter); // Ajoute la classe 'hover' au curseur custom
            target.addEventListener("mouseleave", handleMouseLeave); // Retire la classe 'hover' au curseur custom
        });
        noCursorTargets.forEach(target => {
            target.addEventListener("mouseenter", handleNoCursorEnter);
            target.addEventListener("mouseleave", handleNoCursorLeave);
        });

        // Nettoyage lors du démontage du composant ou du hook
        return () => {
            document.removeEventListener("mousemove", handleMouseMove); // Retire l'écouteur de mouvement de souris
            hoverTargets.forEach((target) => {
                target.removeEventListener("mouseenter", handleMouseEnter); // Retire l'écouteur mouseenter
                target.removeEventListener("mouseleave", handleMouseLeave); // Retire l'écouteur mouseleave
            });
            noCursorTargets.forEach(target => {
                target.removeEventListener("mouseenter", handleNoCursorEnter);
                target.removeEventListener("mouseleave", handleNoCursorLeave);
            });
        };
    }, []); // Le tableau vide [] signifie que l'effet ne s'exécute qu'une fois au montage/démontage
}
