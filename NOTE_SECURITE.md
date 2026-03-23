# NOTE_SECURITE

## Introduction
 
Dans le cadre du projet Visiplus Kanban API (Node.js, Express, MongoDB), plusieurs mesures de sécurité ont été mises en place afin de limiter les risques d'accès non autorisé et d'abus de l'API.
 
## Risques techniques identifiés
 
### 1. Accès non autorisé
 
Une API peut exposer des données sensibles si les routes ne sont pas protégées.
Un utilisateur malveillant pourrait accéder aux données ou effectuer des actions sans authentification.
 
Pour limiter ce risque, un middleware d'authentification basé sur **JWT** a été mis en place.
 
Les routes protégées utilisent le middleware `authenticate`, qui vérifie la présence d'un token JWT dans l'en-tête `Authorization`.
 
Si aucun token n'est fourni, le serveur renvoie une erreur `401 Unauthorized`.

### 2. Abus de l'API

Un utilisateur ou un robot peut envoyer un grand nombre de requêtes afin de surcharger le serveur.

Pour réduire ce risque, un système de **rate limiting** a été mis en place grâce au middleware `express-rate-limit`.

Ce middleware limite le nombre de requêtes par adresse IP :

- Fenêtre : 15 minutes
- Maximum : 100 requêtes par IP

Si la limite est dépassée, l'API renvoie une erreur indiquant que trop de requêtes ont été envoyées.

## Middleware de sécurité utilisés

### Helmet

Le middleware **Helmet** sécurise les en-têtes HTTP afin de protéger l'application contre certaines attaques web courantes :

- XSS (Cross Site Scripting)
- Clickjacking
- Certaines injections côté navigateur

Helmet est activé dans `app.ts`.

### Express Rate Limit

Le middleware **express-rate-limit** limite le nombre de requêtes envoyées par une même adresse IP afin d'éviter les abus et les attaques de type déni de service.

## Test d'une route protégée

Une route protégée `/api/protected` a été créée afin de tester le middleware d'authentification.

Lorsqu'une requête est envoyée sans en-tête `Authorization`, le serveur renvoie une erreur `401 Unauthorized` avec la réponse :

```json
{
  "error": "No token provided"
}
```

## Limites

Les mesures mises en place améliorent la sécurité mais restent basiques. Dans un environnement de production, il serait recommandé d'ajouter :

- Une gestion complète des rôles utilisateurs
- Une validation stricte des données entrantes
- Un système de monitoring et de journalisation avancé
- Une protection réseau (WAF ou firewall)