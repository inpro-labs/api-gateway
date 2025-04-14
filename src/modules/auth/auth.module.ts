import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import {
  AUTH_CLIENT_SERVICE,
  AuthClientProvider,
} from './providers/auth.provider';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth-service',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [SessionController, UserController],
  providers: [SessionService, UserService, AuthClientProvider],
  exports: [AUTH_CLIENT_SERVICE],
})
export class AuthModule {}
