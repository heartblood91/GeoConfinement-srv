<img src="https://cdn.hidemyhome.ovh/iconBig.webp" data-canonical-src="https://cdn.hidemyhome.ovh/iconBig.webp" alt="Logo de l'appli" width="200" height="200" />

# Serveur API de l'application android _GeoConfinement_

> Ce serveur API permet d'envoyer des notifications push aux différents utilisateurs

## Index

- [Description](#description)
- [Screenshots](#screenshots)
- [Installation Serveur API](#installationAPI)
- [Installation de l'application android](#installationAndroid)
- [Package](#package)
- [Confidentialité](#confidentialité)
- [Merci](#merci)

## Description

Avant de débuter, il s'agit du serveur backend de l'application Geoconfinement. Vous pouvez faire un tour sur ce repo : https://github.com/heartblood91/GeoConfinement

Ce serveur API a été développé en même temps que l'application, c'est à dire, en avril-mai 2020, pendant le confinement! Rappelez-vous ?! Il s'agit de cette dernière année où la population vivait sans masque, se faisait la bise, se serrait les mains et sortait dans les bars et restaurants... Ah, la belle époque comme dirait mon grand père!

Le serveur API reçoit une requête POST contenant :

- Un **token** fournit par Expo pour identifier l'utilisateur
- Le **type** pour connaître le message que le serveur doit renvoyer (_Exemple: l'utilisateur est sortie de la zone définie_)
- Une **clé d'API**, un mot de passe complexe pour éviter que ce serveur soit utilisé malhonnêtement

## Screenshots

Voici l'exemple de la notification TEST (mon téléphone est en mode sombre, en mode normal, le fond est blanc, et la police est noire):
<img src="https://cdn.hidemyhome.ovh/notification.webp" data-canonical-src="https://cdn.hidemyhome.ovh/notification.webp" alt="Exemple de notification"  />

**Pour les notifications de la version de production, seul le contenu du message diffère**

 <section id="installationAPI">

## Installation du serveur API

```shell
$ git clone "https://github.com/heartblood91/GeoConfinement-srv.git" && cd GeoConfinement-srv\
$ npm i
```

**Pour des raisons de confidentialité, certaines données sensibles ont été masquées, ou retirées dans les derniers commits. Pour que l'application fonctionne correctement suivez les instructions ci-dessous, sinon le serveur crashera**

1. Ouvrir le fichier credentials-sample.js, et renseignez les informations manquantes.

2. Après, executez la commande suivante pour renommer le fichier:

```shell
$ mv .\credentials-sample.js .\credentials.js
```

3. Pour lancer le serveur, exécuter la commande suivante

- En mode développement ou qualification:

```shell
$ npm run start
```

- En mode production:

```shell
$ npm run prod
```

N'hésitez pas à faire un tour sur mon autre repo pour tester l'application android (https://github.com/heartblood91/GeoConfinement).
**Si vous souhaitez l'installer tout de suite, sans perdre le fil, suvivez la prochaine rubrique**

 <section id="installationAndroid">

## Installation de l'application android

```shell
$ git clone "https://github.com/heartblood91/GeoConfinement.git" && cd GeoConfinement\
$ npm i
```

**Pour les mêmes raisons de confidentialité, certaines données sensibles ont été masquées, ou retirées dans les derniers commits. Pour que l'application fonctionne correctement suivez les instructions ci-dessous, sinon l'appli crashera**

1. Ouvrir les fichiers dans le dossier toConfigure, et renseignez les informations manquantes. Voici la liste des fichiers à modifier:

- app-sample.json
- credentials-sample.js
- AndroidManifest-sample.xml

2. Après, faîtes quelques manipulations pour déplacer les fichiers au bonne endroit:

```shell
$ mv .\toConfigure\credentials-sample.js .\toConfigure\credentials.js
$ mv .\toConfigure\app-sample.json .\app.json
$ mv .\toConfigure\AndroidManifest-sample.xml .\android\app\src\main\AndroidManifest.xml
$ mv .\toConfigure .\credentials
```

Si vous souhaitez tester la bonne configuration frontend - backend sur les notifications

1. Dans le frontend (Confinement), ouvrez le fichier _map-screens_ qui se trouve dans le dossier _screens_
2. Reperez la fonction _componentDidMount_, en haut du fichier
3. Ajoutez cette ligne dans la fonction _componentDidMount_ --> **suscribeToPushNotifications();**
4. Enregistrez le fichier, vous devriez recevoir une notification test sur votre téléphone.

**ATTENTION**: Les notifications push d'expo fonctionnent uniquement sur un téléphone réél, au dernière nouvelle, elle ne fonctionne pas sur un émulateur (<a href="https://docs.expo.io/versions/latest/sdk/notifications/"> voir la doc </a>).

## Package

Il s'agit juste d'une liste des packages utilisées et des mes raisons:

- Express.js (Permet de construire le serveur) --> https://expressjs.com/fr/
- Expo Server SDK (Necessaire pour jumeler node.js et expo) --> https://github.com/expo/expo-server-sdk-node
- Cors (Pour éviter les conflits de nom de domaine) --> https://github.com/expressjs/cors
- Compression (Reduit la taille de la réponse) --> https://github.com/expressjs/compression
- Helmet (Protège l'en-tête de la requête) --> https://helmetjs.github.io/
- Morgan (Pour traiter le json) --> https://github.com/expressjs/morgan
- BoyParser (Pour renvoyer une information dans le corps de la requête) --> https://github.com/expressjs/body-parser

## Confidentialité

Je pense qu'il est important de faire un point sur l'utilisation des données.

Ce serveur tourne en production, il inscrit dans un fichier log, les informations suivantes:

- Le bon lancement du serveur avec le port
- Erreur sur la clé d'API
- Erreur sur le token
- Erreur lors de l'envoie

Cela permet de vérifier son bon fonctionnement et son intégrité. La durée de conservation est d'une semaine. Aucune information personnelle n'est visible.

## Merci

N'hésitez pas à faire des commentaires ou proposés des évolutions de l'application, je verrais ce que je peux faire!
:heartpulse: Merci :heartpulse:
