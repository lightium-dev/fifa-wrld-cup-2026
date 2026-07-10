import { Op } from "sequelize";
import { Match, Affectation, Arbitre } from "../models/index.js";

export const getAllMatches = async (req, res, next) => {
  try {
    const where = {};

    if (req.query.phase) {
      where.phase = req.query.phase;
    }

    if (req.query.ville) {
      where.villeHote = { [Op.iLike]: `%${req.query.ville}%` };
    }

    const matches = await Match.findAll({
      where,
      attributes: ["id", "equipeDomicile", "equipeExterieur", "stade", "villeHote", "dateMatch", "phase"],
      order: [["dateMatch", "ASC"]],
    });

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    next(error);
  }
};

export const getMatchById = async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      attributes: ["id", "equipeDomicile", "equipeExterieur", "stade", "villeHote", "dateMatch", "phase"],
    });

    if (!match) {
      const error = new Error("Match introuvable");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    next(error);
  }
};

export const createMatch = async (req, res, next) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json({ success: true, data: match });
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      const error = new Error("Match introuvable");
      error.statusCode = 404;
      throw error;
    }

    await match.update(req.body);
    res.status(200).json({ success: true, data: match });
  } catch (error) {
    next(error);
  }
};

export const deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      const error = new Error("Match introuvable");
      error.statusCode = 404;
      throw error;
    }

    await match.destroy();
    res.status(200).json({ success: true, message: "Match supprimé" });
  } catch (error) {
    next(error);
  }
};

export const getMatchArbitres = async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      attributes: ["id", "equipeDomicile", "equipeExterieur", "stade", "villeHote", "dateMatch", "phase"],
      include: [
        {
          model: Affectation,
          as: "affectations",
          attributes: ["id", "role"],
          include: [
            {
              model: Arbitre,
              as: "arbitre",
              attributes: ["id", "nom", "prenom", "confederation", "categorie", "statut"],
            },
          ],
        },
      ],
    });

    if (!match) {
      const error = new Error("Match introuvable");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    next(error);
  }
};
