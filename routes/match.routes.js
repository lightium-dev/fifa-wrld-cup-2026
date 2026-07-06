import { Router } from "express";
import {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
  getMatchArbitres,
} from "../controllers/match.controller.js";
import { validateMatch } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.get("/:id/arbitres", getMatchArbitres);
router.post("/", validateMatch, createMatch);
router.put("/:id", validateMatch, updateMatch);
router.delete("/:id", deleteMatch);

export default router;
