import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApplicationException } from '@inpro-labs/api-sdk';
import { Response } from 'express';

@Catch(ApplicationException)
export class GatewayExceptionFilter
  implements ExceptionFilter<ApplicationException>
{
  catch(exception: ApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.statusCode || 500;

    response.status(status).json({
      message: exception.message || 'Internal server error',
      statusCode: status,
      code: exception.code || 'INTERNAL_SERVER_ERROR',
      success: false,
    });
  }
}
