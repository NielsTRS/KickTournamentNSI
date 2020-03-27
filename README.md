# Kick Tournament
Kick Tournament est un jeu de plateforme 2D où le but est de tuer ses adversaires tout en esquivant leurs coups !

## Comment jouer ?
Cliquez pour attaquer.
Utilisez A et D pour vous déplacer, ESPACE pour sauter.
Echap. pour ouvrir le menu, et paramétrer les options.

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

### Accéder au site
Vous pouvez maintenant accéder au jeu en démarrant votre navigateur web et allez à l'adresse : http://127.0.0.1:2000

### Création du design
Pour ce projet, j'ai encore une fois utilisé la technologie de SASS via le framework Compass.
Vous pouvez retrouver dans le dossier public/assets/styles/sass tout les fichiers en .scss qui permettent de gérer l'affichage du site une fois compilé via Compass (voir config.rb).

### Création des pages HTML
Le site est plutôt simple niveau pages web. En effet, il y a une page d'accueil (index.html) qui permet de présenter brièvement le jeu, puis une deuxième page web (game.html) qui nous donne l'interface qui nous permet de jouer avec d'autres joueurs (c'est un jeu multi-joueurs).

### Création du chat (nodeJS + jQuery)
Pour le chat, j'ai utilisé un event via Socket.io qui permet de synchroniser le serveur NodeJS et le client. J'ai également décidé d'utiliser jQuery pour afficher dynamiquement les messages entre joueurs.

## Partie Maël

### À la recherche d'une bibliothèque
Créer un jeu sur le web est compliqué sans une bonne bibliothèque. J'ai donc fait la première erreur de m'essayer à créer de A à Z le code pour le jeu, sauf que je me suis heurté à de nombreux problèmes de synchronisation, d'optimisation, etc... Finalement je me suis tourné vers p5.js qui provient d'un ancien projet nommé Processing (https://processing.org/). Alors que Processing est destiné à un langage comme Java, p5.js ici est destiné à Javascript. Il offre de nombreuses possibilités pour améliorer le travail des développeurs et des artistes web en tout genre.

### L'idée du jeu
Avant de vouloir créer un jeu, il faut d'abord développer son idée. Lors de la première séance d'NSI consacrée à ce nouveau projet, nous avons d'abord réfléchi ensemble, Niels et moi, sur des mécaniques de jeu qui seraient intéressantes d'utiliser pour ce dernier. Nous avons donc démarré avec l'idée de créer un plateformer mais finalement nous nous sommes arrêtés à un jeu multijoueurs où chacun devrait affronter le plus de personnes sans se faire tuer. Le reste a été ajouté sur un Google Docs pour faciliter la compréhension des mécaniques de jeu.

### Concevoir l'algorithme
Ceci est donc l'étape cruciale par laquelle passeront toutes les mécaniques de jeu. En passant de la connexion à la mort du joueur ou sa déconnexion, sans un bon algorithme de **très** mauvaises choses peuvent se passer. Ainsi j'ai pris un crayon et du papier et je me suis mis à réfléchir sur le comment j'allais réaliser tout ça.

### Convertir l'algorithme en programme fonctionnel
Vu que les grandes lignes sont déjà réfléchies, il n'y a juste qu'à les traduire et les ajuster si besoin. Le reste étant de simplifier le tout pour que ça soit optimisé.

### Corriger les bugs
Bien que je sois loin d'être un développeur aguéri, il y a quand même un minimum à faire en terme de résolution bug. À partir du moment où le jeu est jouable, je considère ça comme une bonne étape de franchie.
*Mea culpa: (Mal)heureusement il en subsiste quelques uns qui ne poseront pas de grands problèmes si ce n'est qu'il faille rafraîchir la page.*

### La communication entre les clients et les serveurs
Niels a utilisé la même mini-bibliothèque nommée "socket.io". Elle m'a permi de créer des évènements dans lesquels sont contenus les données qui transitent entre les machines (cordonnées des joueurs, de leurs attaques, touches pressées, configurations changées, etc...). La partie principale du code utilise un heartbeat (ou battement de coeur en français) qui actualise les données à chaque battement.

### Les données utilisateur
Stockées dans les cookies, ces données sont accessibles n'importe où mais pas par n'importe qui. Elles me permettent de trouver les touches paramétrées par l'utilisateur ou bien même à quel volume sont réglés les sons ou la musique.
