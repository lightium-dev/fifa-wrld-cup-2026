import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateAuth } from "../middlewares/validate.middleware.js";
const router = Router();

router.post("/register", authenticate, authorize("admin"), validateAuth, register);
router.post("/login", validateAuth, login);
router.get("/me", authenticate, me);

export default router;
