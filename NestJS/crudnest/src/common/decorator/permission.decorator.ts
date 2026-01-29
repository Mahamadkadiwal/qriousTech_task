import { SetMetadata } from '@nestjs/common';
import { PermissionObj } from 'src/auth/interface/user.interface';

export const PERMISSION_KEY = 'permissions';
export const Permission = (feature: string, ...actions: string[]) => {
  const permissions: PermissionObj[] = actions.map((action) => ({
    feature,
    name: action,
  }));

  return SetMetadata(PERMISSION_KEY, permissions);
};
