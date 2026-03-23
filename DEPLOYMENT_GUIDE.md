# Deployment Guide

Ce document décrit comment installer, lancer et mettre à jour l'application.

## 1. Prérequis techniques

L'application nécessite les outils suivants :

- Node.js 20
- npm
- Docker

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```properties
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/visiplus
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

## 2. Installation et exécution

### Installation

1. Cloner le projet :

```bash
git clone <repository-url>
cd visiplus
```

2. Installer les dépendances :

```bash
npm install
```

### Exécution en local

```bash
npm run dev
```

L'application est accessible sur : `http://localhost:3000`

### Exécution avec Docker

#### Dockerfile

Le `Dockerfile` suivant permet de construire une image Node.js de production :

```dockerfile
# Étape 1 : image de base
FROM node:20-alpine

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances de production uniquement
RUN npm install --production

# Copie du code source compilé
COPY . .

# Exposition du port
EXPOSE 3000

# Lancement du serveur
CMD ["npm", "start"]
```

#### Construction et lancement

1. Construire l'image :

```bash
docker build -t visiplus-app .
```

2. Lancer le conteneur :

```bash
docker run --env-file .env -p 3000:3000 visiplus-app
```

3. Vérifier le bon fonctionnement :

```bash
curl http://localhost:3000/api/health
```

L'API doit répondre avec un statut `200 OK`.

#### (Optionnel) Lancement avec docker-compose

Un fichier `docker-compose.yml` permet de lancer l'application et MongoDB dans des conteneurs associés :

```yaml
services:
  app:
    build: .
    container_name: visiplus-app
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      PORT: 3000
      MONGODB_URI: mongodb://mongo:27017/visiplus
      JWT_SECRET: your-super-secret-jwt-key-at-least-32-characters-long
      JWT_EXPIRES_IN: 7d
      CORS_ORIGIN: "*"
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    container_name: visiplus-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

Lancer l'ensemble des services :

```bash
docker-compose up --build
```

> **Note :** penser à mettre à jour la variable `MONGODB_URI` dans le fichier `.env` pour pointer vers le conteneur MongoDB :
> `MONGODB_URI=mongodb://mongo:27017/visiplus`

## 3. Commandes de test

Lancer les tests :

```bash
npm test
```

Vérifier la compilation :

```bash
npm run build
```

## 4. Procédure de mise à jour

### Mise à jour locale

1. Récupérer les modifications :

```bash
git pull
```

2. Mettre à jour les dépendances :

```bash
npm install
```

3. Relancer l'application :

```bash
npm run dev
```

### Mise à jour avec Docker

Reconstruire l'image puis relancer le conteneur :

```bash
docker build -t visiplus-app .
docker run --env-file .env -p 3000:3000 visiplus-app
```