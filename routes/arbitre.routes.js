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
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/search", searchArbitres);
router.get("/", authenticate, getAllArbitres);
router.get("/:id", authenticate, getArbitreById);
router.get("/:id/matchs", authenticate, getArbitreMatches);
router.post("/", authenticate, authorize("admin", "commissaire"), validateArbitre, createArbitre);
router.put("/:id", authenticate, authorize("admin", "commissaire"), validateArbitre, updateArbitre);
router.delete("/:id", authenticate, authorize("admin"), deleteArbitre);
export default router;
