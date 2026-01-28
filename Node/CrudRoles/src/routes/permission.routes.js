import express from "express";
import { createPermission, editPermission } from "../controllers/permission.controller.js";
import { authUser } from "../middlewares/authMiddleware.js";
import { permissionMiddleware } from "../middlewares/checkPermission.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { permissionSchema } from "../schemas/permission.Schema.js";

const router = express();

router.post('/create', authUser, permissionMiddleware("permission","add"), validate(permissionSchema),createPermission);
router.put('/edit/:permission_id', authUser, permissionMiddleware("permission","update"), validate(permissionSchema), editPermission);

export default router;