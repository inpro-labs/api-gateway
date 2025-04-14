import { ClientService } from '@inpro-labs/microservices';

export const AUTH_CLIENT_SERVICE = Symbol('AUTH_CLIENT_SERVICE');

export const AuthClientProvider = {
  provide: AUTH_CLIENT_SERVICE,
  useFactory: ClientService.fromFactory(),
  inject: ['AUTH_SERVICE'],
};
