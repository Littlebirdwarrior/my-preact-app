import { useEffect } from 'preact/hooks';

export function useHeader() {
    useEffect(() => {

        const navElement = document.querySelector(".nav");

        if (window.innerWidth >= 768){
            navElement.classList.remove("hide");
            navElement.classList.add("show");
            return;
        }
        
        const toggleElement = document.querySelector(".nav-toogle");
        if (!navElement || !toggleElement) return;

        const handleToggleClick = () => {
            navElement.classList.toggle("hide");
            navElement.classList.toggle("show");
        };

        toggleElement.addEventListener('click', handleToggleClick);

        return () => {
            toggleElement.removeEventListener('click', handleToggleClick);
        };
    }, []);
}