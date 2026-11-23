# JARDÉO 2.7 — Scanner public
Ce fichier est le code d'un Cloudflare Worker. GitHub Pages seul ne peut pas garder une clé API secrète.

1. Créer un compte gratuit sur https://dash.cloudflare.com/ .
2. Workers & Pages → Create → Worker → Deploy.
3. Edit code : remplacer le code par le contenu de `cloudflare-worker.js`, puis Deploy.
4. Settings → Variables and Secrets → Add → **Secret** nommé `PLANTNET_API_KEY`, contenant la clé Pl@ntNet. Ne jamais utiliser une variable publique.
5. Activer les protections anti-abus / limitation des requêtes disponibles dans Cloudflare ; le contrôle CORS ne suffit pas.
6. Récupérer l'URL `https://...workers.dev` et la communiquer pour brancher le scanner JARDÉO.
7. Tester le service depuis JARDÉO. Vérifier les quotas Pl@ntNet et les limites Cloudflare.

La reconnaissance publique n'est pas active tant que le Worker et sa clé ne sont pas déployés et que le site n'est pas raccordé. Ne pas publier la clé dans le dépôt GitHub.
