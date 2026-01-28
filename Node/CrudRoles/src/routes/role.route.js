import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
} from "../controllers/role.controller.js";

import { authUser } from "../middlewares/authMiddleware.js";
import { permissionMiddleware } from "../middlewares/checkPermission.js";
import { roleSchema } from "../schemas/role.schema.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/create", authUser, permissionMiddleware("role","create"), validate(roleSchema), createRole);
router.get("/", authUser, permissionMiddleware("role","view"), getRoles);
router.get("/:role_id", authUser, permissionMiddleware("role","view"), getRoleById);
router.put("/update/:role_id", authUser, permissionMiddleware("role","update"), updateRole);
router.delete("/delete/:role_id", authUser, permissionMiddleware ("role","delete"), deleteRole);

export default router;
