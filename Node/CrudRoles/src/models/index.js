import Permission from "./permission.model.js";
import Role from "./role.model.js";
import RolePermission from "./role_permission.model.js";
import UserRole from "./user_role.model.js";
import Users from "./users.model.js";

Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: 'role_id',
});

RolePermission.belongsTo(Role, {
    foreignKey: 'role_id'
});

Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: 'permission_id',
});

RolePermission.belongsTo(Permission, {
    foreignKey: 'permission_id'
});

Users.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'user_id'
});

UserRole.belongsTo(Users, {
    foreignKey: 'user_id'
});

Role.belongsToMany(Users, {
    through: UserRole,
    foreignKey: 'role_id'
});

UserRole.belongsTo(Role, {
    foreignKey: 'role_id'
});

export { Permission, RolePermission, Role, Users };

