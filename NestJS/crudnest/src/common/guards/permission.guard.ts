import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from 'src/permission/permission.service';
import { PERMISSION_KEY } from '../decorator/permission.decorator';
import { JwtUser, PermissionObj } from 'src/auth/interface/user.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionObj[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }

    const { user }: { user: JwtUser } = context.switchToHttp().getRequest();

    if (!user || !user?.roles) {
      return false;
    }

    const roleIds = user?.roles.map((r) => r?.roleId);
    const userPermissions =
      await this.permissionService.getPermissionByUserId(roleIds);

    console.log('permission', userPermissions);

    return requiredPermissions.some((reqPerm) =>
      userPermissions.some(
        (userPerm) =>
          userPerm.feature === reqPerm?.feature &&
          userPerm.name === reqPerm?.name,
      ),
    );
  }
}
