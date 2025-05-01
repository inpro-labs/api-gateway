import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientService, QueryParams } from '@inpro-labs/microservices';
import { AUTH_CLIENT_SERVICE } from '../providers/auth.provider';
import { REQUEST } from '@nestjs/core';
import { injectHeaders } from 'src/shared/utils/inject-headers';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @Inject(AUTH_CLIENT_SERVICE) private readonly authClient: ClientService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async revokeSession(sessionId: string): Promise<unknown> {
    this.logger.log(
      `sending event: [revoke_session] [sessionId: ${sessionId}]`,
    );
    return (
      await this.authClient.apply<{ sessionId: string }>('revoke_session', {
        data: { sessionId },
        metadata: injectHeaders(this.request.headers),
      })
    ).unwrap();
  }

  async listUserSessions(
    userId: string,
    take: number,
    skip: number,
  ): Promise<unknown> {
    this.logger.log(
      `sending event: [list_user_sessions] [userId: ${userId}] [take: ${take}] [skip: ${skip}]`,
    );
    return (
      await this.authClient.apply<QueryParams<{ userId: string }, true>>(
        'list_user_sessions',
        {
          data: { data: { userId }, pagination: { take, skip } },
          metadata: injectHeaders(this.request.headers),
        },
      )
    ).unwrap();
  }
}
