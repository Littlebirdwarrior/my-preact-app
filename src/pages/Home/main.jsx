/**
 * Composant Home : page d'accueil du portfolio
 */
import './style.css'; // Styles spécifiques à la page Home
import { useMousePosition } from '../../hooks/useMousePosition.js'; // Import du hook

export function Home() {
  // Récupère la position de la souris
  const { x, y } = useMousePosition();

  // Affiche le logo, un titre, une description et un bouton
  return (
    <div className="home-container">
      <h1 className="h1">Bienvenue</h1>
      {/* Div qui suit la souris */}
      <div
        className="cursor-follow"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          left: x,
          top: y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
