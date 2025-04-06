import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApplicationException,
  Err,
  MicroserviceRequest,
  Ok,
  Result,
} from '@inpro-labs/api-sdk';
import { firstValueFrom } from 'rxjs';
import { CreateSessionRequestDto } from '../dtos/session/create-session-request.dto';

@Injectable()
export class SessionService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async apply<T>(
    command: string,
    payload: MicroserviceRequest<T>,
  ): Promise<Result<unknown>> {
    try {
      const source$ = this.client.send<unknown>(command, payload);

      const session = await firstValueFrom<unknown>(source$);

      return Ok(session);
    } catch (error) {
      const err = error as {
        message: string;
        statusCode: number;
        code: string;
      };

      return Err(
        new ApplicationException(err.message, err.statusCode, err.code),
      );
    }
  }

  async createSession(payload: CreateSessionRequestDto): Promise<unknown> {
    return (
      await this.apply<CreateSessionRequestDto>('create_session', {
        data: payload,
        metadata: {},
      })
    ).unwrap();
  }

  async revokeSession(sessionId: string): Promise<unknown> {
    return (
      await this.apply<{ sessionId: string }>('revoke_session', {
        data: { sessionId },
        metadata: {},
      })
    ).unwrap();
  }

  async listUserSessions(userId: string): Promise<unknown> {
    return (
      await this.apply<{ userId: string }>('list_user_sessions', {
        data: { userId },
        metadata: {},
      })
    ).unwrap();
  }
}
