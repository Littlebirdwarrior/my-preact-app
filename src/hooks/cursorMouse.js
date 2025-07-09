import { useEffect } from "preact/hooks";

// Hook personnalisé pour gérer un curseur custom
export function useCustomCursor() {
    useEffect(() => {
        // Récupère l'élément du DOM qui sert de curseur personnalisé
        const customCursor = document.getElementById("custom-cursor");
        if (!customCursor) return;

        console.log(" bazinga 1");

        // Fonction pour déplacer le curseur personnalisé à la position de la souris
        // avec evenement handlerMouseMove lié à mousemove, JS natif
        const handleMouseMove = (e) => { 
            const cursorSize = customCursor.clientWidth / 2;
            // injecte la div en lui assignant la position de la souris
            customCursor.style.left = `${e.clientX - cursorSize}px`; 
            customCursor.style.top = `${e.clientY - cursorSize}px`;
        };

        // Ajoute une classe CSS quand la souris survole certains éléments (effet hover)
        const handleMouseEnter = () => customCursor.classList.add("custom-cursor ");
        const handleMouseLeave = () => customCursor.classList.remove("custom-cursor ");

        // Ajoute l'écouteur global pour déplacer le curseur personnalisé
        document.addEventListener("mousemove", handleMouseMove);

        // Sélectionne tous les éléments interactifs à survoler (liens, boutons, etc.)
        const hoverTargets = document.querySelectorAll(
            'a, button, [role="button"], input[type="button"], input[type="submit"], .hover-target'
        );
        // Ajoute les écouteurs pour l'effet hover sur chaque cible
        hoverTargets.forEach((target) => {
            target.addEventListener("mouseenter", handleMouseEnter);
            target.addEventListener("mouseleave", handleMouseLeave);
        });

        // Nettoyage lors du démontage du composant ou du hook
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            hoverTargets.forEach((target) => {
                target.removeEventListener("mouseenter", handleMouseEnter);
                target.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);
}
