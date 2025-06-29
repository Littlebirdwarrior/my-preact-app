/**
 * Composant Home : page d'accueil du portfolio
 */
import './style.css'; // Styles spécifiques à la page Home

export function Home() {
  // Affiche le logo, un titre, une description et un bouton
  return (
    <div className="home-container">
      <h1>Bienvenue sur mon portfolio Preact</h1>
      <p>Découvrez mes projets et expériences avec Preact.</p>
      <button
        onClick={() => alert('Merci de votre visite !')}
        className="cta-button"
      >
        Contactez-moi
      </button>
    </div>
  );
}
