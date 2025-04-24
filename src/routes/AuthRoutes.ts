import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controllers/AuthController";
import { validate } from "../middlewares/Validation";
import { registerSchema, loginSchema } from "../validations/AuthValidations";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);

export { router as authRoutes };
