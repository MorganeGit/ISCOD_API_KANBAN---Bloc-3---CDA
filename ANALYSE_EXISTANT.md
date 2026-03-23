# Analyse de l’existant

## Structure du projet

Le projet Jaydee Kanban est une API backend développée en Node.js avec Express et MongoDB.  
Le code est écrit en TypeScript.

Le dossier `src` est organisé de la manière suivante :

- `config/` : configuration de l’application
- `controllers/` : logique métier
- `middlewares/` : middlewares Express
- `models/` : modèles MongoDB
- `routes/` : routes de l’API
- `main.ts` : entrée principale de l’application
- `server.ts` : configuration du serveur Express
- `app.ts` : export de l’application Express pour les tests

Le projet contient également un dossier `tests` pour les tests automatisés.

## Dépendances principales

Les dépendances principales identifiées dans `package.json` sont :

- Express : framework web utilisé pour l’API
- Mongoose : communication avec la base MongoDB
- Dotenv : gestion des variables d’environnement
- Zod : validation des variables d’environnement
- JsonWebToken : gestion de l’authentification
- Helmet et express-rate-limit : sécurisation de l’API

## Variables d’environnement

Les variables d’environnement utilisées sont :

- `NODE_ENV`
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`

Ces variables sont validées au démarrage de l’application à l’aide de la bibliothèque Zod.

## Routes et modèles principaux

### Modèles
- `Column.ts` : colonnes du tableau Kanban
- `OF.ts` : ordres de fabrication
- `User.ts` : utilisateurs

### Routes
- `auth.routes.ts` : authentification
- `columns.routes.ts` : gestion des colonnes
- `ofs.routes.ts` : gestion des ordres de fabrication

## Tests existants

Le projet contient déjà des tests automatisés et utilise Vitest, Supertest et MongoDB Memory Server.

## Risques techniques

- mauvaise configuration des variables d’environnement (`MONGODB_URI`, `JWT_SECRET`)
- échec de connexion à la base MongoDB
- sécurité dépendante de la robustesse du secret JWT
