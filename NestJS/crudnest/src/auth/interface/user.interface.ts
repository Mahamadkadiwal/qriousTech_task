export interface JwtRole {
  roleId: number;
  roleName: string;
}

export interface JwtUser {
  userId: number;
  roles: JwtRole[];
}

export interface PermissionObj {
  feature: string;
  name: string;
}
