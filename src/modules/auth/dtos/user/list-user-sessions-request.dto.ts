import { Pagination } from '@inpro-labs/microservices';
import { ApiProperty } from '@nestjs/swagger';

export class ListUserSessionsRequestDto implements Pagination {
  @ApiProperty({
    description: 'The user id',
    example: '1234567890',
  })
  userId: string;

  @ApiProperty({
    description: 'The take',
    example: 10,
  })
  take: number;

  @ApiProperty({
    description: 'The skip',
    example: 0,
  })
  skip: number;
}
