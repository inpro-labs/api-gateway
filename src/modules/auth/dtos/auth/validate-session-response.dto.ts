import { ApiProperty } from '@nestjs/swagger';

export class ValidateSessionResponseDto {
  @ApiProperty({
    description: 'The session is valid',
    example: true,
  })
  isValid: boolean;

  @ApiProperty({
    description: 'The user id',
    example: '123',
  })
  userId: string;

  @ApiProperty({
    description: 'The session id',
    example: '123',
  })
  sessionId: string;

  @ApiProperty({
    description: 'The session expires at',
    example: '2021-01-01T00:00:00.000Z',
  })
  expiresAt: string;
}
