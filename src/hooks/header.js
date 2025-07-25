import { useEffect } from 'preact/hooks';

export function useHeader() {
    useEffect(() => {
        const navElement = document.querySelector(".nav");
        if (!navElement) return;

        const handleMouseEnter = () => {
            navElement.style.display = "block";
        };
        const handleMouseLeave = () => {
            navElement.style.display = "none";
        };

        navElement.addEventListener('mouseenter', handleMouseEnter);
        navElement.addEventListener('mouseleave', handleMouseLeave);

        // Nettoyage des écouteurs au démontage
        return () => {
            navElement.removeEventListener('mouseenter', handleMouseEnter);
            navElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);
}