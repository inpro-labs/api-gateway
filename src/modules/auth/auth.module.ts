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
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE_AUTH',
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
  controllers: [SessionController, UserController, AuthController],
  providers: [SessionService, UserService, AuthService, AuthClientProvider],
  exports: [AUTH_CLIENT_SERVICE],
})
export class AuthModule {}
