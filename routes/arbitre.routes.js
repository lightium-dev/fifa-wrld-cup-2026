import { Router } from "express";
import {
  getAllArbitres,
  searchArbitres,
  getArbitreById,
  getArbitreMatches,
  createArbitre,
  updateArbitre,
  deleteArbitre,
} from "../controllers/arbitre.controller.js";
import { validateArbitre } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/search", searchArbitres);
router.get("/", getAllArbitres);
router.get("/:id", getArbitreById);
router.get("/:id/matchs", getArbitreMatches);
router.post("/", validateArbitre, createArbitre);
router.put("/:id", validateArbitre, updateArbitre);
router.delete("/:id", deleteArbitre);

export default router;
