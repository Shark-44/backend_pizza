# Mon Projet Pizza-Backend Node.js
## Description

Ce projet est un backend construit avec Node.js et Express. Il utilise MySQL pour la base de données et est configuré avec ESLint, Prettier, et Nodemon pour le développement.
Installation
## Prérequis

    Node.js et npm installés sur votre machine.
    Une base de données MySQL.

## Étapes d'installation

  1.  **Cloner le projet** :

    bash

git clone https://github.com/Shark-44/backend_pizza
cd backend_pizza

2. **Installer les dépendances** :

bash

npm install

3. **Configurer les variables d'environnement** :

Créez un fichier .env à la racine du projet et ajoutez les variables nécessaires. Exemple :

makefile

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=mot_de_passe
    DB_NAME=nom_de_la_base

## Scripts npm

Voici les différentes commandes que vous pouvez utiliser pour gérer le projet.
### Démarrage du serveur

    **. En mode développement (avec rechargement automatique des changements) :**

```bash
npm run dev
```
    **. En mode production :**

```bash
npm start
```

## Linting & Formatage

   **. Vérifier le code pour les erreurs de style :**

```bash
npm run lint
```

Corriger automatiquement les erreurs de style :

```bash
npm run fix
```

## Migration de base de données

   **. Exécuter les migrations** (si un fichier migrate.js existe pour gérer les migrations) :

```bash
npm run migrate
```

## Structure du projet

    index.js : Fichier principal où l'application Express démarre.
    .env : Variables d'environnement pour la configuration du projet.
    node_modules/ : Répertoire contenant les dépendances du projet.
    package.json : Fichier listant les dépendances et les scripts npm.

## Utilisation

Après avoir démarré le serveur, accédez à http://localhost:4242 pour voir l'application en action.
