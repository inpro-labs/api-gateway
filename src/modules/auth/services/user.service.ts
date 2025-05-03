import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos/user/create-user-request.dto';
import { ClientService, QueryParams } from '@inpro-labs/microservices';
import { AUTH_CLIENT_SERVICE } from '../providers/auth.provider';
import { injectHeaders } from 'src/shared/utils/inject-headers';
import { ListUserSessionsRequestDto } from '../dtos/user/list-user-sessions-request.dto';
import { REQUEST } from '@nestjs/core';
import { Logger } from '@nestjs/common';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(AUTH_CLIENT_SERVICE) private readonly authClient: ClientService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async createUser(payload: CreateUserRequestDto): Promise<unknown> {
    return (
      await this.authClient.apply<CreateUserRequestDto>('create_user', {
        data: payload,
        metadata: injectHeaders(this.request.headers),
      })
    ).unwrap();
  }

  async listUserSessions(
    payload: ListUserSessionsRequestDto,
  ): Promise<unknown> {
    this.logger.log(
      `sending event: [list_user_sessions] [userId: ${payload.userId}] [take: ${payload.take}] [skip: ${payload.skip}]`,
    );
    return (
      await this.authClient.apply<QueryParams<{ userId: string }, true>>(
        'list_user_sessions',
        {
          data: {
            data: { userId: payload.userId },
            pagination: { take: payload.take, skip: payload.skip },
          },
          metadata: injectHeaders(this.request.headers),
        },
      )
    ).unwrap();
  }
}
