import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { EnvService } from '@/config/env/env.service';
import { Request } from 'express';
import {
  ApplicationException,
  ClientService,
  MicroserviceResponse,
} from '@inpro-labs/microservices';
import { ValidateSessionRequestDto } from '@/modules/auth/dtos/auth/validate-session-request.dto';
import { injectHeaders } from '@/shared/utils/inject-headers';
import { ValidateSessionResponseDto } from '@/modules/auth/dtos/auth/validate-session-response.dto';
import { AUTH_CLIENT_SERVICE } from '@/modules/auth/providers/auth.provider';
import { User } from '@/shared/types/principal';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    envService: EnvService,
    @Inject(AUTH_CLIENT_SERVICE) private authClient: ClientService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: Record<string, string>,
  ): Promise<User> {
    const token = request.headers.authorization!;
    const [, tokenValue] = token.split(' ');

    const validSessionResult =
      await this.authClient.apply<ValidateSessionRequestDto>(
        'validate_session',
        {
          data: {
            accessToken: tokenValue,
          },
          metadata: injectHeaders(request.headers),
        },
      );

    const validSession =
      validSessionResult.unwrap() as MicroserviceResponse<ValidateSessionResponseDto>;

    if (!validSession.success) {
      throw new ApplicationException(
        validSession.message,
        validSession.statusCode,
        validSession.code,
      );
    }

    const { isValid } = validSession.data;

    if (!isValid) {
      throw new ApplicationException('Invalid session', 401, 'INVALID_SESSION');
    }

    return {
      email: payload.email,
      userId: payload.sub,
      sessionId: payload.sid,
      deviceId: payload.deviceId,
    };
  }
}
