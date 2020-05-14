const express = require("express");
const Expo = require("expo-server-sdk").default;
const cors = require("cors");

const expo = new Expo();
const expressServer = express();

expressServer.use(cors());

expressServer.listen(process.env.PORT || 3000, () => {
  console.log("Serveur en écoute sur le port: ", process.env.PORT || 3000);

  expressServer.get("/", function (req, res) {
    const token = req.query.token;
    const type = req.query.type;

    if (!Expo.isExpoPushToken(token)) {
      console.log("Token invalide");
      res.send({ err: "Token invalide" });
    } else {
      const messages = renderMessages(token, type);

      expo
        .sendPushNotificationsAsync(messages)
        .then((ticket) => {
          res.send({ ticket: ticket });
        })
        .catch((err) => {
          console.log("Erreur d'envoi");
          res.send({ err: "Erreur d'envoi: "});
        });
    }
  });
});

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
      messages[0].body = "Il ne reste plus que 15 minutes avant la fin du temps imparti ;-)";
      return messages;

    case "timer0":
      messages[0].body = "Trop tard, le temps est écoulé :-(";
      return messages;

    default:
      return messages;
  }
};
