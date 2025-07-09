import { Hero, Cursor } from '../../components/Hero.jsx'; // Import des deux composants

export function Home() {
  // Affiche le curseur custom et le composant Hero
  return (
    <>
      <Cursor />
      <Hero />
    </>
  );
}
