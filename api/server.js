// Ce fichier est destiné à lancer l'API localement sur le port 3001.
require("dotenv").config();

if (process.env.REACT_APP_ENV === "DEVELOPMENT") {

  const app = require("./index.js");

  app.listen(3001, () => {
    console.log("L'API est disponible à l'adresse http://localhost:3001.");
  });
}
