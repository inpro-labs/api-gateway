import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: 'The JWT access token of the user',
  })
  accessToken: string;

  @ApiProperty({
    description: 'The refresh token of the user',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'The expires at of the access token',
    example: '2021-01-01T00:00:00.000Z',
  })
  expiresAt: string;
}
