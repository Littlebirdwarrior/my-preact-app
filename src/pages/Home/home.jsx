import { Hero } from '../../components/Hero.jsx'; 
import { Carousel } from '../../components/Carousel.jsx';
import { carouselItems } from '../../data/carouselData.js';


export function Home() {
  // Affiche le curseur custom et le composant Hero
  return (
    <>
    <section class="no-cursor">
      <Hero />
    </section>
    <section>
      <Carousel items={carouselItems} />
    </section>
    </>
  );
}
