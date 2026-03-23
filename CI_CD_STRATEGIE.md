# Stratégie CI/CD

## Objectifs de la CI/CD

Dans le cadre de ce projet Node.js, Express et MongoDB, la stratégie CI/CD a pour objectif d’automatiser les vérifications techniques et la mise en ligne de l’application.
L’intégration continue permet de contrôler rapidement chaque modification grâce à l’installation des dépendances, à l’exécution des tests et à la validation de la construction du projet. 
Le déploiement continu vise ensuite à livrer une version exploitable de manière plus régulière et plus sûre. 
Cette démarche répond à trois enjeux principaux : automatisation des tâches répétitives, fiabilité des mises en production et qualité du code livré.

## Déclencheurs du pipeline

Le pipeline peut être déclenché automatiquement dans les situations suivantes :

- lors d’un push sur une branche, pour vérifier immédiatement les changements ;
- lors d’une pull request, afin de valider le code avant fusion ;
- lors d’une release, pour lancer le processus de livraison et de déploiement.

Dans ce projet, l’usage de GitHub Actions est cohérent, car le code source et la logique de collaboration peuvent être centralisés sur GitHub, avec un pipeline défini directement dans le dépôt.

## Étapes principales du pipeline

Le pipeline CI/CD peut être structuré autour des étapes suivantes :

1. Installation : récupération du dépôt, installation des dépendances Node.js avec `npm ci` et préparation de l’environnement.
2. Test : exécution des tests unitaires et d’intégration avec `npm test`. Dans ce projet, les tests reposent sur Vitest, Supertest et MongoDB Memory Server (valide l’API sans base MongoDB locale).
3. Build : génération de la version exploitable de l’application afin de vérifier que le projet peut être construit sans erreur.
4. Déploiement : mise en ligne automatique de l’application, par exemple via une image Docker ou un service d’hébergement compatible (uniquement si les étapes précédentes sont validées).

## Exemple simplifié de pipeline YAML

```yaml
name: ci-cd
on: [push, pull_request, release]
jobs:
  app:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: docker compose up --build -d
```

## Gestion des secrets et validations avant mise en production

Les secrets ne doivent jamais être écrits en dur dans le code source ni dans les fichiers versionnés. 
Dans ce projet, des variables sensibles comme `MONGODB_URI`, `JWT_SECRET` ou d’autres paramètres définis dans `.env` doivent être stockées dans les Secrets GitHub Actions ou dans les variables sécurisées de la plateforme de déploiement.
Avant une mise en production, plusieurs validations sont nécessaires : 
- réussite des tests, build sans erreur ; 
- cohérence de la configuration Docker ;
- vérification du bon fonctionnement général de l’API. 
Pour limiter les risques, le déploiement en production ne doit être autorisé que si toutes les étapes précédentes sont validées. 

Cette stratégie CI/CD est adaptée au projet, car elle s’appuie sur les outils déjà présents dans l’application, automatise le contrôle qualité et prépare un déploiement plus fiable dans un contexte professionnel.