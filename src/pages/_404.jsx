/**
 * Composant NotFound : page affichée pour les routes inconnues
 */
export function NotFound() {
  // Affiche un message d'erreur 404
  return (
    <section style={{ textAlign: 'center', marginTop: '8rem' }}>
      <h1 style={{ fontSize: '8rem', fontFamily: 'Poppins' }}>404</h1>
      <p>Oups... Page non trouvée.</p>
    </section>
  );
}