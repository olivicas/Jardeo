# JARDÉO 1.0

Application web statique en français, adaptée aux mobiles.

## Fonctionnalités
- Tableau de bord
- Ajout, modification, suppression et recherche des plantes
- Fiches d'entretien personnalisables
- Calendrier mensuel, conseils saisonniers et tâches à cocher
- Plan simplifié du jardin par zones
- Sauvegarde automatique dans localStorage, export/import JSON

## Publication sur GitHub Pages
1. Créez un dépôt GitHub public (par exemple `jardeo`).
2. Envoyez **le contenu de ce dossier** à la racine du dépôt : `index.html`, `style.css`, `app.js`, `manifest.webmanifest`, `icon.svg`.
3. Dans **Settings > Pages**, choisissez **Deploy from a branch**, branche **main**, dossier **/(root)**, puis enregistrez.
4. Ouvrez l'URL fournie par GitHub Pages, généralement `https://VOTRE-PSEUDO.github.io/jardeo/`.

## Limites de cette version
- Données enregistrées **uniquement sur le navigateur/appareil utilisé**, sans synchronisation entre appareils.
- Pensez à exporter une sauvegarde JSON depuis Réglages.
- Le calendrier propose des conseils saisonniers généraux, pas des recommandations météo ou botaniques individualisées.
- Le plan représente des zones, pas un plan graphique déplaçable.
- La PWA dispose d'un manifeste, mais aucun service worker : l'utilisation hors ligne après fermeture du navigateur n'est pas garantie.
- Aucun compte utilisateur ni stockage cloud dans cette version.
