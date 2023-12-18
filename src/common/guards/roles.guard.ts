import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const checkRoles = roles.some((r) => r === user.role);
    if (!checkRoles) {
      throw new UnauthorizedException('Permission deny!');
    }
    return true;
  }
}

// improve: tao bang permission user, khi admin cap quyen cho user A: co the tao bai viet cho san pham => user moi khi muon tao bai danh
// thi se check permission cua user neu duoc cap quyen => tao bai viet
