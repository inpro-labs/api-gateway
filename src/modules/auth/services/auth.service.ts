import { Inject, Injectable } from '@nestjs/common';
import { ClientService, MicroserviceRequest } from '@inpro-labs/microservices';
import { AUTH_CLIENT_SERVICE } from '../providers/auth.provider';
import { SignInRequestDto } from '../dtos/auth/sign-in-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_CLIENT_SERVICE) private readonly authClient: ClientService,
  ) {}

  async signIn(
    payload: SignInRequestDto,
    metadata: MicroserviceRequest['metadata'],
  ): Promise<unknown> {
    return (
      await this.authClient.apply<SignInRequestDto>('sign_in', {
        data: payload,
        metadata,
      })
    ).unwrap();
  }
}
