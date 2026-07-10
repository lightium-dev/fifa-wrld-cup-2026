import "dotenv/config";
import { Arbitre } from "./arbitre.model.js";
import { Match } from "./match.model.js";
import { Affectation } from "./affectation.model.js";
import { User } from "./user.model.js";

Arbitre.hasMany(Affectation, {
  foreignKey: "arbitreId",
  as: "affectations",
  onDelete: "CASCADE",
});

Match.hasMany(Affectation, {
  foreignKey: "matchId",
  as: "affectations",
  onDelete: "CASCADE",
});

Affectation.belongsTo(Arbitre, {
  foreignKey: "arbitreId",
  as: "arbitre",
});

Affectation.belongsTo(Match, {
  foreignKey: "matchId",
  as: "match",
});

Arbitre.belongsToMany(Match, {
  through: Affectation,
  foreignKey: "arbitreId",
  otherKey: "matchId",
  as: "matchs",
});

Match.belongsToMany(Arbitre, {
  through: Affectation,
  foreignKey: "matchId",
  otherKey: "arbitreId",
  as: "arbitres",
});

export { Arbitre, Match, Affectation };
export { User };
