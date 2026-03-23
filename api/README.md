# apo-blablabook

## Création BDD avec PostgreSQL

- -> Connexion à psql : `sudo -i -u postgres psql`

- `CREATE USER blablabook WITH PASSWORD '....';`
- `CREATE DATABASE blablabook OWNER blablabook;`
- -> Déconnexion

Pour se reconnecter si besoin:

`psql -U blablabook -d blablabook`

## Création d'un fichier Sequelize

- Créer un fichier `sequelize.client.js` dans le dossier `/models`
- Tester la connexion dans le terminal avec `node test-sequelize.js`en créant un fichier `test-sequelize.js` dans `/models`

## Création de tous les modèles

- Dans `/models`créer `User.model.js`, `Book.model.js`, `Author.model.js`, `Gender.model.js`, `index.js`, `UserBook.model.js`
- Dans `index.js` définir les associations

## Création des tables

- Dans `/migrations` créer `01.createTables.js`
- Lancer le script `npm run db:create` 

## Seed

`npm install argon2`

- Créer un fichier `02.seedTables.js`
- lancer le script `npm run db:seed`