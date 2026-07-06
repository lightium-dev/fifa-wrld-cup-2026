import { Router } from "express";
import {
  getAllAffectations,
  getAffectationById,
  createAffectation,
  deleteAffectation,
} from "../controllers/affectation.controller.js";
import { validateAffectation } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", getAllAffectations);
router.get("/:id", getAffectationById);
router.post("/", validateAffectation, createAffectation);
router.delete("/:id", deleteAffectation);

export default router;
