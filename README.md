# Kick Tournament
projet nsi

## Partie de Niels

### Installation du serveur NodeJS
Installez nodejs avec ces commandes (debian) : 
- curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
- sudo apt install nodejs

Copier le dépot 
- git clone git@github.com:NielsTRS/Kick_Tournament.git

Allez dans le répertoire du dépot puis lancez la commande :
- cd Kick_Tournament
- npm install

### Lancer le serveur
- node app.js
Vous pouvez maintenant accéder au jeu avec l'adresse : http://127.0.0.1:2000

### Création du design
Pour ce projet, j'ai encore une fois utilisé la technologie de SASS via le framework Compass.
Vous pouvez retrouver dans le dossier public/assets/styles/sass tout les fichiers en .scss qui permettent de gérer l'affichage du site une fois compilé via Compass (voir config.rb).

### Création des pages HTML
Le site est plutôt simple niveau pages web. En effet, il y a une page d'accueil (index.html) qui permet de présenter brièvement le jeu, puis une deuxième page web (game.html) qui nous donne l'interface qui nous permet de jouer avec d'autres joueurs (c'est un jeu multi-joueurs).

### Création du chat (nodeJS + jQuery)
Pour le chat, j'ai utilisé un event via Socket.io qui permet de synchroniser le serveur NodeJS et le client. J'ai également décidé d'utiliser jQuery (c'est une bibliothèque Javascript permettant de simplfier et de rendre plus efficace nos codes) pour afficher dynamiquement les messages entre joueurs.

## Partie Maël
