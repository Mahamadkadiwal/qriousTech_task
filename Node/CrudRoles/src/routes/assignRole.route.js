import express from 'express'
import { assignRoleToUser } from '../controllers/assignRole.controller.js';
import { authUser } from '../middlewares/authMiddleware.js';
import { permissionMiddleware } from '../middlewares/checkPermission.js';

const router = express();

router.post('/assignRole',authUser, permissionMiddleware("role", "assign"), assignRoleToUser);

export default router;