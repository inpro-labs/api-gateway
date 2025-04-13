import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApplicationException,
  Err,
  MicroserviceRequest,
  Ok,
  Result,
} from '@inpro-labs/api-sdk';
import { firstValueFrom, timeout, TimeoutError } from 'rxjs';
import { CreateUserRequestDto } from '../dtos/user/create-user-request.dto';

@Injectable()
export class UserService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async apply<T>(
    command: string,
    payload: MicroserviceRequest<T>,
  ): Promise<Result<unknown>> {
    try {
      const source$ = this.client
        .send<unknown>(command, payload)
        .pipe(timeout(30000));

      const session = await firstValueFrom<unknown>(source$);

      return Ok(session);
    } catch (error) {
      const err = error as {
        message: string;
        statusCode: number;
        code: string;
      };

      if (error instanceof TimeoutError) {
        return Err(
          new ApplicationException('Request timed out', 504, 'TIMEOUT'),
        );
      }

      return Err(
        new ApplicationException(err.message, err.statusCode, err.code),
      );
    }
  }

  async createUser(payload: CreateUserRequestDto): Promise<unknown> {
    return (
      await this.apply<CreateUserRequestDto>('create_user', {
        data: payload,
        metadata: {},
      })
    ).unwrap();
  }
}
