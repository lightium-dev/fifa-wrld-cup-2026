import express from "express"
import {sequelize} from "./config/database.js"
import "dotenv/config"




const app = express();
app.use(express.json());




app.get('/', (req, res) => {
  res.send('API RefTech is running');
});
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log(' Connexion à PostgreSQL réussie');
    app.listen(PORT, () => {
      console.log(` Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err)
    console.error(' Erreur de connexion :', err.message);
  });