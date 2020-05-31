const express = require("express");
const Expo = require("expo-server-sdk").default;
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Récupère les informations sensibles
const { DEV_PORT, PROD_PORT, API_KEY } = require("./credentials");

// Port:
const PORT =
  process.env.NODE_ENV.indexOf("production") > -1 ? PROD_PORT : DEV_PORT;

const expo = new Expo();
const expressServer = express();

// Permet d'utiliser  la compression gzip --> amélioration des perfs
expressServer.use(compression());

//Permet de protéger le header
expressServer.use(helmet());

// Permet au serveur d'utiliser des extensions (morgan pour les api + de parser le json + les cors)
expressServer.use(cors());
expressServer.use(morgan("combined"));
expressServer.use(bodyParser.json({ type: "*/*" }));

//Lance le serveur sur le port définit
expressServer.listen(PORT, () => {
  console.log("Serveur en écoute sur le port: ", PORT);

  // Requête POST pour récupérer le type, le token et la clé d'API afin d'envoyer une notification
  expressServer.post("/sendNotification", function (req, res) {
    const { token, type, secret } = req.body;

    // Vérification de la clé d'API
    if (secret === API_KEY) {
      // Vérification du token
      if (!Expo.isExpoPushToken(token)) {
        console.log("Token invalide");
        res.send({ err: "Token invalide" });
      } else {
        // Construction du message selon le type
        const messages = renderMessages(token, type);

        // Envoie du message
        expo
          .sendPushNotificationsAsync(messages)
          .then((ticket) => {
            res.send({ ticket: ticket });
          })
          .catch((err) => {
            console.log("Erreur d'envoi");
            res.send({ err: "Erreur d'envoi: " });
          });
      }
    } else {
      console.log("unauthorized");
      res.status(401).send({ err: "unauthorized" });
    }
  });
});

// Permet de construire le message selon le type
const renderMessages = (token, type) => {
  let messages = [
    {
      to: token,
      sound: "default",
      body: "Notifcation test",
    },
  ];

  switch (type) {
    case "warning":
      messages[0].body = "Attention! Vous êtes sortis de la zone définie :-(";
      return messages;

    case "timer15":
      messages[0].body =
        "Il ne reste plus que 15 minutes avant la fin du temps imparti ;-)";
      return messages;

    case "timer0":
      messages[0].body = "Trop tard, le temps est écoulé :-(";
      return messages;

    default:
      return messages;
  }
};
