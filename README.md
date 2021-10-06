# Projet

> AUDABRAM Luc
> FONTAINE Quentin
> HUAUT Antonin

## Architecture
Nous avons trois webservices :
- LibraryService : s'occupe de gérer la bibliothèque : livres, auteurs, éditeurs et emprunts
- UserService : gère les utilisateurs et les rôles
- ProxyService : point d'entrée de l'application. Les requêtes vers le LibraryService/UserService **doivent** passer ce service. Il gère aussi l'authentification et les accès : est-ce que tel utilisateur peut effectuer telle action.  
Il sert aussi du front-end réalisé en React.

Nous avons mis en place notre architecture sur https://ensiws.maner.fr/. Cette adresse pointe vers le proxy. On peut accéder par le proxy via :
- https://ensiws.maner.fr/library/ : pour LibraryService
- https://ensiws.maner.fr/user/ : pour UserService
- https://ensiws.maner.fr/ : pour le front-end

Les services LibraryService et UserService sont sur le même serveur que le proxy mais un pare-feu a été mis en place sur la machine pour n'autoriser que les ports HTTP et HTTPS, avec une redirection du domaine ensiws sur le ProxyService.  
Cela permet d'être sûr que personne ne contournera le système d'authentification et de gestion des permissions présent sur le ProxyService.

## Authentification token magique
Nous avons fait un choix d'avoir un token magique pour avoir les privilèges admins "à la volée".  
Cela permet de créer des utilisateurs comme on le souhaite. D'ailleurs, le menu d'inscription permet de choisir son rôle et de créer un administrateur si on le souhaite.  
Bien sûr, ceci a été réalisé dans un cadre scolaire et ne serait pas fait sur un projet réel !  
Ce token est stocké dans les fichiers .env.

## Postman
Nous avons réalisé de nombreux tests avec Postman.  
Nous avons envoyé un lien pour rejoindre notre Workspace par email.  
Il ne faut pas oublier d'activer un environnement (local ou à distance).

## Executer les services
> Des exécutables .sh et .bat sont disponibles pour exécuter les commandes indiquées dans chaque dossier.

### LibraryService
> Développé et testé avec Oracle JDK 11
```shell
cd LibraryService/
mvn clean install
java -jar target/LibraryService-0.0.1-SNAPSHOT.jar
```

### UserService
> Développé et testé avec Node 12 & Node 14
```shell
cd UserService/
npm install
npm start
```

### ProxyService
> Développé et testé avec Deno 1.14  
> Lien d'installation : https://deno.land/#installation
```shell
cd ProxyService/
deno run --allow-net --allow-env --allow-read=./ src/app.ts
```

### Frontend
> Développé et testé avec Node 12 & Node 14  
> Le dossier de sorti est configuré pour être dans `../ProxyService/front/`
```shell
cd library_client/
npm install
npm run build
```