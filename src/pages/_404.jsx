/**
 * Composant NotFound : page affichée pour les routes inconnues
 */
export function NotFound() {
  // Affiche un message d'erreur 404
  return (
    <section style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404</h1>
      <p>Page non trouvée.</p>
    </section>
  );
}
