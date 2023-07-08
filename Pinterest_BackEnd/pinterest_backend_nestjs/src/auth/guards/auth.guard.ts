import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.metadata';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthPayload } from 'src/types/AuthPayload';

@Injectable()
export class AuthGuard implements CanActivate {
  private prisma: PrismaClient;
  constructor(private jwtService: JwtService, private reflector: Reflector) {
    this.prisma = new PrismaClient();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: AuthPayload = await this.jwtService.verifyAsync(token);
      const token_user = await this.prisma.user.findUnique({
        where: {
          user_id: payload.user_id,
        },
      });
      if (!token_user.token) {
        throw new UnauthorizedException();
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
