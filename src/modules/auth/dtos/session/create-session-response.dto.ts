import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionResponseDto {
  @ApiProperty({
    description: 'The id of the session',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The device of the session',
    example: 'IOS',
  })
  device: string;

  @ApiProperty({
    description: 'The user agent of the session',
    example:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  })
  userAgent: string;

  @ApiProperty({
    description: 'The ip of the session',
    example: '127.0.0.1',
  })
  ip: string;

  @ApiProperty({
    description: 'The user id of the session',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @ApiProperty({
    description: 'The refresh token hash of the session',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  refreshTokenHash: string;

  @ApiProperty({
    description: 'The expires at of the session',
    example: '2021-01-01T00:00:00.000Z',
  })
  expiresAt: Date;

  @ApiProperty({
    description: 'The revoked at of the session',
    example: '2021-01-01T00:00:00.000Z',
    nullable: true,
  })
  revokedAt: Date;
}
