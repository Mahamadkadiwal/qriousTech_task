import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/auth.decorator';
import { JwtUser } from 'src/auth/interface/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user }: { user: JwtUser } = context.switchToHttp().getRequest();

    if (!user || !user?.roles) {
      return false;
    }

    const userRoleNames = user?.roles.map((r) => r?.roleName);

    if (userRoleNames.includes('admin')) {
      return true;
    }
    return requiredRoles.some(
      (role) => userRoleNames.includes(role) || role === 'admin',
    );
  }
}
