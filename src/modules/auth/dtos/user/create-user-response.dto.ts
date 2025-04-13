import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({
    description: 'The id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    description: 'The verified of the user',
    example: true,
    nullable: true,
  })
  verified: boolean;

  @ApiProperty({
    description: 'The created at of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
