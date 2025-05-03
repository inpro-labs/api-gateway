import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { map, mergeMap, of, takeWhile, tap } from 'rxjs';
import { ValidateSessionResponseDto } from 'src/modules/auth/dtos/auth/validate-session-response.dto';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {
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

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    return of(canActivate).pipe(
      mergeMap((value) => value),
      takeWhile((value) => value),
      map(() => context.switchToHttp().getRequest<Request>()),
      mergeMap((request) =>
        of(request).pipe(
          map((req) => req.headers.authorization),
          mergeMap((token) => {
            if (!token) {
              throw new UnauthorizedException();
            }

            return this.authService.validateSession({ accessToken: token });
          }),
          tap(
            ({
              isValid,
              userId,
              sessionId,
              expiresAt,
            }: ValidateSessionResponseDto) => {
              if (!isValid) {
                throw new UnauthorizedException();
              }

              request.user = { userId, sessionId, expiresAt };
            },
          ),
          map(() => true),
        ),
      ),
    );
  }
}
