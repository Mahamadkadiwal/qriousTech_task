import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtUser, PermissionObj } from 'src/auth/interface/user.interface';
import { PERMISSION_KEY } from '../decorator/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionObj[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    const { user }: { user: JwtUser } = context.switchToHttp().getRequest();

    if (!user || !user?.roles) {
      return false;
    }

    if (user.roles?.some((r) => r.roleName === 'admin')) {
      return true;
    }

    const permissions = user.permissions || [];

    return requiredPermissions.some((reqPerm) =>
      permissions.some(
        (userPerm) =>
          userPerm.feature === reqPerm?.feature &&
          userPerm.permission === reqPerm?.name,
      ),
    );
  }
}
