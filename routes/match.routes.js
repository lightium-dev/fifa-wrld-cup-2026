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
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", authenticate, getAllMatches);
router.get("/:id", getMatchById);
router.get("/:id/arbitres", authenticate, getMatchArbitres);
router.post("/", authenticate, authorize("admin", "commissaire"), validateMatch, createMatch);
router.put("/:id", validateMatch, updateMatch);
router.delete("/:id", deleteMatch);
export default router;
