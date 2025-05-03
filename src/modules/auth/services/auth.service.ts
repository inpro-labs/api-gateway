import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientService } from '@inpro-labs/microservices';
import { AUTH_CLIENT_SERVICE } from '../providers/auth.provider';
import { SignInRequestDto } from '../dtos/auth/sign-in-request.dto';
import { REQUEST } from '@nestjs/core';
import { injectHeaders } from 'src/shared/utils/inject-headers';
import { RefreshTokenRequestDto } from '../dtos/auth/refresh-token-request.dto';
import { SignOutRequestDto } from '../dtos/auth/sign-out-request.dto';
import { ValidateSessionRequestDto } from '../dtos/auth/validate-session-request.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(AUTH_CLIENT_SERVICE) private readonly authClient: ClientService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async signIn(payload: SignInRequestDto): Promise<unknown> {
    this.logger.log(`sending event: [sign_in]`);
    return (
      await this.authClient.apply<SignInRequestDto>('sign_in', {
        data: payload,
        metadata: injectHeaders(this.request.headers),
      })
    ).unwrap();
  }

  async signOut(): Promise<unknown> {
    this.logger.log(`sending event: [sign_out]`);
    return (
      await this.authClient.apply<SignOutRequestDto>('sign_out', {
        data: {
          accessToken: this.request.headers.get('authorization')!,
        },
        metadata: injectHeaders(this.request.headers),
      })
    ).unwrap();
  }

  async refreshToken(payload: RefreshTokenRequestDto): Promise<unknown> {
    this.logger.log(
      `sending event: [refresh_token] [refreshToken: ${payload.refreshToken}]`,
    );
    return (
      await this.authClient.apply<RefreshTokenRequestDto>('refresh_token', {
        data: payload,
        metadata: injectHeaders(this.request.headers),
      })
    ).unwrap();
  }

  async validateSession(payload: ValidateSessionRequestDto): Promise<unknown> {
    this.logger.log(`sending event: [validate_session]`);
    return (
      await this.authClient.apply<ValidateSessionRequestDto>(
        'validate_session',
        {
          data: payload,
          metadata: injectHeaders(this.request.headers),
        },
      )
    ).unwrap();
  }
}
