import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Observable } from 'rxjs';
import { ApplicationException } from '@inpro-labs/microservices';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject(Reflector) private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any, info: { message?: string }) {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new ApplicationException(
        info?.message || 'Token não informado',
        401,
        'INVALID_TOKEN',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
