/**
 * Configuration pour GitHub Copilot
 * 
 * - Les réponses doivent être en français.
 * - Si la réponse n'est pas tirée de la documentation officielle, Copilot doit le préciser.
 * - Tout code généré doit être précédé d'un commentaire JSDoc.
 * - Chaque ligne de code générée doit être commentée.
 */

module.exports = {
  language: "fr", // Définit la langue de réponse à français
  docSourceNotice: true, // Précise si la réponse n'est pas tirée de la documentation
  jsdocBeforeCode: true, // Ajoute un commentaire JSDoc avant chaque bloc de code généré
  lineByLineComments: true // Commente chaque ligne de code générée
};
