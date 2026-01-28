import express from 'express';
import userRouter from './routes/user.routes.js';
import checkRouter from './routes/check.routes.js';
import permissionRouter from './routes/permission.routes.js';
import assignPermissionRouter from './routes/assignPermission.routes.js';
import roleRouter from './routes/role.route.js';
import assignRoleRouter from './routes/assignRole.route.js';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/check', checkRouter);
app.use('/api/permission', permissionRouter);
app.use('/api/assign', assignPermissionRouter);
app.use('/api/role', roleRouter);
app.use('/api/assign', assignRoleRouter);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

export default app;