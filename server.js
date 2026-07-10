import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { sequelize } from "./config/database.js";
import arbitreRoutes from "./routes/arbitre.routes.js";
import matchRoutes from "./routes/match.routes.js";
import affectationRoutes from "./routes/affectation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(logger);

app.use("/arbitres", arbitreRoutes);
app.use("/matchs", matchRoutes);
app.use("/affectations", affectationRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API RefTech is running" });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à PostgreSQL réussie");
    await sequelize.sync();
  } catch (err) {
    console.error("Erreur de connexion à la base de données :", err.message || err);
    console.error("Démarrage du serveur en mode dégradé (base indisponible)");
  }

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}

startServer();

app.use(errorHandler);
