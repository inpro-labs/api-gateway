import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as ExpressResponse } from 'express';
import { MicroserviceResponse } from '@inpro-labs/microservices';

@Injectable()
export class HttpStatusCodeInterceptor
  implements NestInterceptor<MicroserviceResponse, MicroserviceResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<MicroserviceResponse> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();

    return next.handle().pipe(
      map((data: MicroserviceResponse) => {
        if (data && typeof data === 'object' && 'statusCode' in data) {
          response.status(data.statusCode);
        }
        return data;
      }),
    );
  }
}
