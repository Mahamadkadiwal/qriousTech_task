export interface JwtRole {
  roleId: number;
  roleName: string;
  permissions: JwtPermission[];
}

export interface JwtPermission {
  permission_id: number;
  feature: string;
  permission: string;
}

export interface JwtUser {
  userId: number;
  roles: JwtRole[];
  permissions: JwtPermission[];
}

export interface PermissionObj {
  feature: string;
  name: string;
}
