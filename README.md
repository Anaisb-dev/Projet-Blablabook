<<<<<<< HEAD
# apo-blablabook

## Création BDD avec PostgreSQL

- -> Connexion à psql : `sudo -i -u postgres psql`

- `CREATE USER blablabook WITH PASSWORD "blablabook";`
- `CREATE DATABASE blablabook OWNER blablabook;`
- -> Déconnexion

Pour se reconnecter si besoin:

`psql -U blablabook -d blablabook`

## Création d'un fichier Sequelize

- Créer un fichier `sequelize.client.js` dans le dossier `/models`
- Tester la connexion dans le terminal avec `node test-sequelize.js`en créant un fichier `test-sequelize.js` dans `/models`

## Création de tous les modèles

- Dans `/models`créer `User.js`, `Book.js`, `Author.js`, `Gender.js`, `index.js`
- Dans `index.js` définir les associations

## Création des tables

- Dans `/migrations` créer `create-table.js`
