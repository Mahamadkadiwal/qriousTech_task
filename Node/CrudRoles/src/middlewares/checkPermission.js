import { getPermissionByUserId } from "../controllers/permission.controller.js";

export const permissionMiddleware = (features,action) => {
  return async (req, res, next) => {
    try {
      const user_id = req.user.userId;
      const roleIds = req.user.roleIds;
      const roleNames = req.user.roleNames;

      if(roleNames.includes('admin') || roleNames === 'admin') return next();
      
      const permissions = await getPermissionByUserId(user_id, roleIds);

      
      const permission = `${features}:${action}`;
      const permissionStrings = permissions.map(p => `${p.feature}:${p.name}`);
      
      if (!permissionStrings.includes(permission)) {
        return res.status(403).json({
          message: "Access denied",
          required: permission
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        message: "Permission check failed",
        error: err.message
      });
    }
  };
};
