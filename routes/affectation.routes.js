import { Router } from "express";
import {
  getAllAffectations,
  getAffectationById,
  createAffectation,
  deleteAffectation,
} from "../controllers/affectation.controller.js";
import { validateAffectation } from "../middlewares/validate.middleware.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getAllAffectations);
router.get("/:id", getAffectationById);
router.post("/", authenticate, authorize("admin", "commissaire"), validateAffectation, createAffectation);
router.delete("/:id", authenticate, authorize("admin", "commissaire"), deleteAffectation);

export default router;
