type Permission = { feature: string; permission: string };

export function hasPermission(
  perms: Permission[],
  resource: string,
  action: string,
  roles?: { roleId: number; roleName: string }[],
) {
  if (roles?.some((role) => role.roleName === "admin")) return true;

  return perms.some((p) => p.feature === resource && p.permission === action);
}
