import { useState, useEffect } from 'preact/hooks';
import carouselItems from '../data/carouselData.json';

//Je crée un élément item pour le carousel

const Item = ({ title, description, image }) => {
    return (
        <div className="carousel-item">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

// Fonction pour déterminer le nombre d'éléments visibles en fonction de la largeur de la fenêtre
const getVisibleCount = (width) => {
    if (width >= 768) return 3;
    if (width >= 640) return 2;
    return 1;
};

// je le répète avec un map

const Carousel = () => {

    /**
     * useState(0) crée une variable d’état appelée activeIndex initialisée à 0.
     * activeIndex représente l’index de la slide actuellement affichée dans le carousel (la première slide au départ).
     * setActiveIndex est une fonction qui permet de changer la valeur de activeIndex au click
     * (par exemple, quand on clique sur un bouton du carousel). */
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(getVisibleCount(window.innerWidth));

    // Met à jour visibleCount lors du chargement initial et à chaque redimensionnement de la fenêtre
    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount(window.innerWidth));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calcule les indices à afficher selon visibleCount
    const visibleItems = Array.from({ length: visibleCount }, (_, i) =>
        carouselItems[(activeIndex + i) % carouselItems.length]
    );
    
    return (
        <div className="carousel-container">
            <div className="carousel no-cursor">
                {visibleItems.map((item, idx) => (
                    <Item 
                        key={activeIndex + '-' + idx}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
            <div className="carousel-controls">
                {
                    // 1. Math.ceil(carouselItems.length / visibleCount)
                    //    => Calcule combien de "pages" il y a dans le carousel.
                    //    Exemple : 6 items, visibleCount=2 => 3 pages (6/2)
                    // 2. Array.from({ length: ... })
                    //    => Crée un tableau de la taille du nombre de pages, rempli d'éléments vides.
                    // 3. .map((_, pageIndex) => (...))
                    //    => Pour chaque page, on crée un bouton de navigation.
                    Array.from({ length: Math.ceil(carouselItems.length / visibleCount) }).map((_, pageIndex) => (
                        <button
                            key={pageIndex}
                            className="carousel-button"
                            onClick={() => setActiveIndex(pageIndex * visibleCount)}
                            aria-label={`Aller à la page ${pageIndex + 1}`}
                            {...(Math.floor((activeIndex % carouselItems.length) / visibleCount) === pageIndex
                                ? { 'aria-current': 'true' }
                                : {})}
                        >
                        </button>
                    ))
                }
            </div>
        </div>
    );

};

// export

export { Carousel, Item };
