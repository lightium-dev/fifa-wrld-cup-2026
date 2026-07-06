import { Op } from "sequelize";
import { Arbitre } from "../models/index.js";

const parsePagination = (req) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 10));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export const getAllArbitres = async (req, res, next) => {
  try {
    const { page, limit, offset } = parsePagination(req);
    const where = {};

    if (req.query.confederation) {
      where.confederation = req.query.confederation;
    }

    if (req.query.statut) {
      where.statut = req.query.statut;
    }

    if (req.query.search) {
      where[Op.or] = [
        { nom: { [Op.iLike]: `%${req.query.search}%` } },
        { prenom: { [Op.iLike]: `%${req.query.search}%` } },
      ];
    }

    const { count, rows } = await Arbitre.findAndCountAll({
      where,
      attributes: ["id", "nom", "prenom", "nationalite", "confederation", "categorie", "experience", "statut"],
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const searchArbitres = async (req, res, next) => {
  try {
    const search = req.query.q || req.query.search || "";
    const arbitres = await Arbitre.findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.iLike]: `%${search}%` } },
          { prenom: { [Op.iLike]: `%${search}%` } },
          { confederation: { [Op.iLike]: `%${search}%` } },
        ],
      },
      attributes: ["id", "nom", "prenom", "confederation", "categorie", "statut"],
      order: [["nom", "ASC"]],
    });

    res.status(200).json({ success: true, data: arbitres });
  } catch (error) {
    next(error);
  }
};

export const getArbitreById = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id, {
      attributes: ["id", "nom", "prenom", "nationalite", "confederation", "categorie", "experience", "statut"],
    });

    if (!arbitre) {
      const error = new Error("Arbitre introuvable");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: arbitre });
  } catch (error) {
    next(error);
  }
};

export const createArbitre = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.create(req.body);
    res.status(201).json({ success: true, data: arbitre });
  } catch (error) {
    next(error);
  }
};

export const getArbitreMatches = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id, {
      attributes: ["id", "nom", "prenom", "confederation", "categorie", "statut"],
      include: [
        {
          association: "matchs",
          through: { attributes: ["role"] },
          attributes: ["id", "equipeDomicile", "equipeExterieur", "stade", "villeHote", "dateMatch", "phase"],
        },
      ],
    });

    if (!arbitre) {
      const error = new Error("Arbitre introuvable");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: arbitre });
  } catch (error) {
    next(error);
  }
};

export const updateArbitre = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id);

    if (!arbitre) {
      const error = new Error("Arbitre introuvable");
      error.statusCode = 404;
      throw error;
    }

    await arbitre.update(req.body);
    res.status(200).json({ success: true, data: arbitre });
  } catch (error) {
    next(error);
  }
};

export const deleteArbitre = async (req, res, next) => {
  try {
    const arbitre = await Arbitre.findByPk(req.params.id);

    if (!arbitre) {
      const error = new Error("Arbitre introuvable");
      error.statusCode = 404;
      throw error;
    }

    await arbitre.destroy();
    res.status(200).json({ success: true, message: "Arbitre supprimé" });
  } catch (error) {
    next(error);
  }
};
