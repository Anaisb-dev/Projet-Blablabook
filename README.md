# apo-blablaboo 📚

BlablaBook est une plateforme en ligne de gestion de bibliothèque personnelle. Elle permet à des lecteurs confirmés ou encore novices de partager leur lectures et de gérer leur propre bibliothèque.

## 📝 Description du projet

### API Backend

L'API backend est construite avec **Node.js**, **Express** et **Sequelize** pour gérer les données dans une base de données **PostgreSQL**. Elle expose des endpoints pour les livres, les utilisateurs et la gestion de l'authentification, ainsi que le formulaire de contact.

### Client Frontend

Le client est développé avec **Svelte** et utilise **Vite** comme outil de build. Il offre une interface utilisateur intuitive pour interagir avec les données fournies par l'API.


---


## 🚀 Besoins Fonctionnels (Minimum Viable Product - MVP)

- Page d'accueil avec présentation de BlaBlaBook et quelques livres “random”.
- Système d'inscription et de connexion.
- Gestion de bibliothèque personnelle : y ajouter des livres, lus et à lire, pouvoir les retirer de sa liste (et non de la base de données ^^).
- Recherche et découverte de nouveaux livres : moteur de recherche.
- Page de détail d'un livre avec les informations liées à ce dernier.


---


## 🛠️ Technologies utilisées

### Backend 

- **Node.js**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL** (BDD)
- **JWT** (JSON Web Token)
- **Joi** (validation des données)
- **dotenv** (gestion des variables d'environnement)

### Frontend

- **Svelte**
- **Vite**
- **Tailwind CSS**
- **Bits Ui** (pour les composants) 

### Environnement et déploiement

- **NPM** (Gestionnaire des dépendances)
- **Render** (Hébergement)
- **Docker** (Conteneurisation)


---


## 📂 Structure du projet

- **`api/`** : Contient le code backend (API).
- **`client/`** : Contient le code frontend (interface utilisateur).


---


## ⚙️ Installation et lancement

### Prérequis

- **Node.js** (version 16 ou supérieure)
- **PostgreSQL** (base de données)

### Étapes

1. **Cloner le dépôt**

2. **Configurer les variables d'environnement**

- Backend : Copier le fichier `.env.example` dans `api/.env` et configurer les valeurs (notamment PG_URL pour la base de données PostgreSQL).

- Frontend : Copier le fichier `.env.example` dans `client/.env` et configurer l'URL de l'API (`VITE_API_URL`).

3. **Installer les dépendances et lancer les projets**

- Backend

```sh
cd api
npm install
npm run db:create
npm run db:seed
npm run dev
```

- Frontend

```sh
cd client
npm install
npm run dev
```