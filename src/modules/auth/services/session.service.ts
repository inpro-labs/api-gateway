import { Inject, Injectable } from '@nestjs/common';
import { CreateSessionRequestDto } from '../dtos/session/create-session-request.dto';
import { ClientService, QueryParams } from '@inpro-labs/microservices';
import { AUTH_CLIENT_SERVICE } from '../providers/auth.provider';

@Injectable()
export class SessionService {
  constructor(
    @Inject(AUTH_CLIENT_SERVICE) private readonly authClient: ClientService,
  ) {}

  async createSession(payload: CreateSessionRequestDto): Promise<unknown> {
    return (
      await this.authClient.apply<CreateSessionRequestDto>('create_session', {
        data: payload,
        metadata: {},
      })
    ).unwrap();
  }

  async revokeSession(sessionId: string): Promise<unknown> {
    return (
      await this.authClient.apply<{ sessionId: string }>('revoke_session', {
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
    console.log({ data: { userId }, pagination: { take, skip } });
    return (
      await this.authClient.apply<QueryParams<{ userId: string }, true>>(
        'list_user_sessions',
        {
          data: { data: { userId }, pagination: { take, skip } },
          metadata: {},
        },
      )
    ).unwrap();
  }
}
