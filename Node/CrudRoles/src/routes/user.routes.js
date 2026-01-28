import express from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";
import {validate} from "../middlewares/validationMiddleware.js";
import { createSchema, loginSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.post("/register" ,validate(createSchema),createUser);
router.post("/login",validate(loginSchema), loginUser);

export default router;