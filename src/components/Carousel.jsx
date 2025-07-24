import { useState } from 'preact/hooks';
import carouselItems from '../data/carouselData.json';

//Je crée un élément item pour le carousel

const Item = ({ title, description, image }) => {
    return (
        <div className="carousel-item">
            <img src={image} alt={title} />
            <h3 className="no-cursor">{title}</h3>
            <p className="no-cursor">{description}</p>
        </div>
    );
};

// je le répète avec un map

const Carousel = () => {

    /**
     * useState(0) crée une variable d’état appelée activeIndex initialisée à 0.
     * activeIndex représente l’index de la slide actuellement affichée dans le carousel (la première slide au départ).
     * setActiveIndex est une fonction qui permet de changer la valeur de activeIndex au click
     * (par exemple, quand on clique sur un bouton du carousel). */
    const [activeIndex, setActiveIndex] = useState(0);

    // Calcule les 3 indices à afficher grace à un modulo (div euclidienne)
    const visibleItems = [
        carouselItems[activeIndex],
        carouselItems[(activeIndex + 1) % carouselItems.length],
        carouselItems[(activeIndex + 2) % carouselItems.length]
    ];
    
    return (
        <div className="carousel-container">
            <div className="carousel">
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
                {visibleItems.map((item, index)=>(
                    <button
                        key={index}
                        className="carousel-button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Aller à la slide ${index + 1}`}
                        // Le spread operator (...) permet d'ajouter dynamiquement des attributs/props à un élément JSX.
                        {...(activeIndex === index ? { 'aria-current': 'true'} : {})}
                    />
                ))}
            </div>
        </div>
    );

};

// export

export { Carousel, Item };
