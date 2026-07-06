import { Affectation, Arbitre, Match } from "../models/index.js";

export const getAllAffectations = async (req, res, next) => {
  try {
    const affectations = await Affectation.findAll({
      attributes: ["id", "arbitreId", "matchId", "role"],
      include: [
        { model: Arbitre, as: "arbitre", attributes: ["id", "nom", "prenom", "categorie"] },
        { model: Match, as: "match", attributes: ["id", "equipeDomicile", "equipeExterieur", "dateMatch", "phase"] },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json({ success: true, data: affectations });
  } catch (error) {
    next(error);
  }
};

export const createAffectation = async (req, res, next) => {
  try {
    const affectation = await Affectation.create(req.body);
    res.status(201).json({ success: true, data: affectation });
  } catch (error) {
    next(error);
  }
};

export const getAffectationById = async (req, res, next) => {
  try {
    const affectation = await Affectation.findByPk(req.params.id, {
      attributes: ["id", "arbitreId", "matchId", "role"],
      include: [
        { model: Arbitre, as: "arbitre", attributes: ["id", "nom", "prenom", "categorie"] },
        { model: Match, as: "match", attributes: ["id", "equipeDomicile", "equipeExterieur", "dateMatch", "phase"] },
      ],
    });

    if (!affectation) {
      const error = new Error("Affectation introuvable");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: affectation });
  } catch (error) {
    next(error);
  }
};

export const deleteAffectation = async (req, res, next) => {
  try {
    const affectation = await Affectation.findByPk(req.params.id);

    if (!affectation) {
      const error = new Error("Affectation introuvable");
      error.statusCode = 404;
      throw error;
    }

    await affectation.destroy();
    res.status(200).json({ success: true, message: "Affectation supprimée" });
  } catch (error) {
    next(error);
  }
};
