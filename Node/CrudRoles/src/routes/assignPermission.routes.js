import express from 'express';
import { assignPermission } from '../controllers/assignPermission.controller.js';
import { authUser } from '../middlewares/authMiddleware.js';
import { permissionMiddleware } from '../middlewares/checkPermission.js';

const router = express();

router.post('/assignPermission', authUser ,permissionMiddleware('add'),assignPermission);

export default router;