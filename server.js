import express from "express";
import "dotenv/config";
import { sequelize } from "./config/database.js";
import arbitreRoutes from "./routes/arbitre.routes.js";
import matchRoutes from "./routes/match.routes.js";
import affectationRoutes from "./routes/affectation.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(logger);

app.use("/arbitres", arbitreRoutes);
app.use("/matchs", matchRoutes);
app.use("/affectations", affectationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API RefTech is running" });
});

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connexion à PostgreSQL réussie");
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion :", err.message);
  });

app.use(errorHandler);
