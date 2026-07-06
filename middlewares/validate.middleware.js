import { Arbitre, Match } from "../models/index.js";

const allowedConfederations = ["UEFA", "CONMEBOL", "CAF", "AFC", "CONCACAF", "OFC"];
const allowedCategories = ["Referee", "Assistant", "Fourth", "VAR", "AVAR"];
const allowedStatuts = ["actif", "suspendu", "blessé", "retraité"];
const allowedPhases = ["Groupes", "8e", "4e", "demi", "finale"];
const allowedVilles = ["USA", "Canada", "Mexique"];
const allowedRoles = ["Referee", "Assistant", "VAR", "AVAR", "Fourth"];

const sendValidationError = (res, message) =>
  res.status(400).json({ success: false, error: { message } });

export const validateArbitre = (req, res, next) => {
  const { nom, prenom, nationalite, confederation, categorie, experience, statut } = req.body;

  if (!nom || !prenom || !nationalite || !confederation || !categorie || experience === undefined) {
    return sendValidationError(res, "Champs requis manquants pour l'arbitre");
  }

  if (!allowedConfederations.includes(confederation)) {
    return sendValidationError(res, "Confédération invalide");
  }

  if (!allowedCategories.includes(categorie)) {
    return sendValidationError(res, "Catégorie invalide");
  }

  if (typeof experience !== "number" || experience < 0) {
    return sendValidationError(res, "Expérience invalide");
  }

  if (statut && !allowedStatuts.includes(statut)) {
    return sendValidationError(res, "Statut invalide");
  }

  next();
};

export const validateMatch = (req, res, next) => {
  const { equipeDomicile, equipeExterieur, stade, villeHote, dateMatch, phase } = req.body;

  if (!equipeDomicile || !equipeExterieur || !stade || !villeHote || !dateMatch || !phase) {
    return sendValidationError(res, "Champs requis manquants pour le match");
  }

  if (!allowedVilles.includes(villeHote)) {
    return sendValidationError(res, "Ville hôte invalide");
  }

  if (!allowedPhases.includes(phase)) {
    return sendValidationError(res, "Phase invalide");
  }

  if (Number.isNaN(Date.parse(dateMatch))) {
    return sendValidationError(res, "Date de match invalide");
  }

  next();
};

export const validateAffectation = async (req, res, next) => {
  const { arbitreId, matchId, role } = req.body;

  if (!arbitreId || !matchId || !role) {
    return sendValidationError(res, "Champs requis manquants pour l'affectation");
  }

  if (!allowedRoles.includes(role)) {
    return sendValidationError(res, "Rôle d'affectation invalide");
  }

  const arbitre = await Arbitre.findByPk(arbitreId);
  if (!arbitre) {
    return sendValidationError(res, "Arbitre introuvable");
  }

  const match = await Match.findByPk(matchId);
  if (!match) {
    return sendValidationError(res, "Match introuvable");
  }

  next();
};
