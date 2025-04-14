import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequestDto } from '../dtos/user/create-user-request.dto';
import { ClientService } from '@inpro-labs/microservices';

@Injectable()
export class UserService {
  private readonly clientService: ClientService;

  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {
    this.clientService = new ClientService(this.client);
  }

  async createUser(payload: CreateUserRequestDto): Promise<unknown> {
    return (
      await this.clientService.apply<CreateUserRequestDto>('create_user', {
        data: payload,
        metadata: {},
      })
    ).unwrap();
  }
}
