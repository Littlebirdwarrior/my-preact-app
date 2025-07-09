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

// je le répète avec un map

const Carousel = ({ items }) => {
    return (
        <div className="carousel-container">
            <div className="carousel">
                {items.map((item, index) => (
                    <Item
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

// export

export { Carousel, Item };
