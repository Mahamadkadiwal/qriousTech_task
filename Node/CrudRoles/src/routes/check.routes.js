import express from "express";
import { checkPermission } from "../controllers/checkPermission.controller.js";
import { authUser } from "../middlewares/authMiddleware.js";
import { permissionMiddleware } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/authPermission", authUser, permissionMiddleware("permission", "add"), checkPermission);

export default router;