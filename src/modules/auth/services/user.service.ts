import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos/user/create-user-request.dto';
import { ClientService } from '@inpro-labs/microservices';
import { AUTH_CLIENT_SERVICE } from '../providers/auth.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject(AUTH_CLIENT_SERVICE) private readonly authClient: ClientService,
  ) {}

  async createUser(payload: CreateUserRequestDto): Promise<unknown> {
    return (
      await this.authClient.apply<CreateUserRequestDto>('create_user', {
        data: payload,
        metadata: {},
      })
    ).unwrap();
  }
}
