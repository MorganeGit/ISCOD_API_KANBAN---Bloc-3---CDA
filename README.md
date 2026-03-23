# Visiplus – Kanban API

## Présentation du projet

Ce projet consiste à développer une API backend pour une application de type Kanban permettant la gestion d'ordres de fabrication (OF), de colonnes et d'utilisateurs.

L'application est développée avec Node.js, Express et MongoDB. Elle expose une API REST permettant de manipuler les différentes ressources nécessaires au fonctionnement d'un tableau Kanban.

Ce projet a été réalisé dans le cadre d'un exercice pédagogique visant à mettre en pratique :

- La création d'une API REST avec Express
- La gestion d'une base de données MongoDB avec Mongoose
- L'organisation d'un projet Node.js
- La mise en place de bonnes pratiques de sécurité

## Technologies utilisées

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Helmet (sécurisation des en-têtes HTTP)
- express-rate-limit (limitation du nombre de requêtes)
- JWT (jsonwebtoken) pour l'authentification

## Installation du projet

### Prérequis

Avant d'installer le projet, il est nécessaire d'avoir :

- Node.js (version 20 recommandée)
- MongoDB installé et lancé
- npm ou yarn

### Installation

Cloner le dépôt :

```bash
git clone <url-du-repo>
cd visiplus
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` à la racine du projet :

```properties
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/visiplus
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

## Lancement du projet

Démarrer le serveur en mode développement :

```bash
npm run dev
```

Le serveur démarre sur : `http://localhost:3000`

## Structure du projet

```
src/
 ├── config/          configuration (env, base de données, logger)
 ├── middlewares/     middlewares Express (authentification, rate limit, erreurs)
 ├── models/          modèles Mongoose
 ├── routes/          routes API
 ├── app.ts           configuration de l'application Express
 ├── server.ts        démarrage du serveur
 └── main.ts          point d'entrée
```

## Mesures de sécurité

Plusieurs mesures de sécurité ont été mises en place dans l'application.

### Protection des en-têtes HTTP

Le middleware **Helmet** est utilisé afin de sécuriser les en-têtes HTTP et limiter certaines attaques web comme :

- XSS (Cross Site Scripting)
- Clickjacking
- Certaines injections côté navigateur

### Limitation du nombre de requêtes

Le middleware **express-rate-limit** limite le nombre de requêtes qu'un utilisateur peut envoyer sur une période donnée afin d'éviter les abus et les attaques de type déni de service.

### Authentification JWT

Certaines routes sont protégées par un middleware d'authentification basé sur **JWT**.

Une route protégée `/api/protected` a été utilisée pour vérifier que l'accès est refusé sans authentification. Lorsqu'une requête est envoyée sans token JWT dans l'en-tête `Authorization`, le serveur renvoie une erreur `401 Unauthorized` avec la réponse :

```json
{
  "error": "No token provided"
}
```

## Tests de fonctionnement

Exemple de test d'une route protégée :

```
GET http://localhost:3000/api/protected
```

Sans token d'authentification, le serveur renvoie une erreur `401 Unauthorized`.

## Auteurs

Projet réalisé dans le cadre d'un exercice pédagogique.

- **Morgane RE**

## Version

Version actuelle : `1.0.0`