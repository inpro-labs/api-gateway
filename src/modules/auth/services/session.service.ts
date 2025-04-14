import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSessionRequestDto } from '../dtos/session/create-session-request.dto';
import { ClientService, QueryParams } from '@inpro-labs/microservices';

@Injectable()
export class SessionService {
  private readonly clientService: ClientService;

  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {
    this.clientService = new ClientService(this.client);
  }

  async createSession(payload: CreateSessionRequestDto): Promise<unknown> {
    return (
      await this.clientService.apply<CreateSessionRequestDto>(
        'create_session',
        {
          data: payload,
          metadata: {},
        },
      )
    ).unwrap();
  }

  async revokeSession(sessionId: string): Promise<unknown> {
    return (
      await this.clientService.apply<{ sessionId: string }>('revoke_session', {
        data: { sessionId },
        metadata: {},
      })
    ).unwrap();
  }

  async listUserSessions(
    userId: string,
    take: number,
    skip: number,
  ): Promise<unknown> {
    return (
      await this.clientService.apply<QueryParams<{ userId: string }, true>>(
        'list_user_sessions',
        {
          data: { data: { userId }, pagination: { take, skip } },
          metadata: {},
        },
      )
    ).unwrap();
  }
}
