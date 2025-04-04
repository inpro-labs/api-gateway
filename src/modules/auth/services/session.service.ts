import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Err, Ok, Result } from '@sputnik-labs/api-sdk';
import { firstValueFrom } from 'rxjs';
import { SessionRequestDto } from '../dtos/session/session-request.dto';

@Injectable()
export class SessionService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async apply(
    command: string,
    payload: Record<string, any>,
  ): Promise<Result<unknown>> {
    try {
      const source$ = this.client.send<unknown>(command, payload);

      const session = await firstValueFrom<unknown>(source$);

      return Ok(session);
    } catch (error) {
      return Err(error);
    }
  }

  async createSession(payload: SessionRequestDto): Promise<unknown> {
    return (await this.apply('create_session', payload)).expect(
      'Failed to create session',
    );
  }

  async revokeSession(id: string): Promise<unknown> {
    return (await this.apply('revoke_session', { id })).expect(
      'Failed to revoke session',
    );
  }
}
