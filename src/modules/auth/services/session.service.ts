import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientService } from '@inpro-labs/microservices';
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
}
