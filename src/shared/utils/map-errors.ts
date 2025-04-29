import { ApplicationException } from '@inpro-labs/microservices';
import { HttpException } from '@nestjs/common';

export const mapErrors = (error: ApplicationException) => {
  throw new HttpException(error.message, error.statusCode);
};
