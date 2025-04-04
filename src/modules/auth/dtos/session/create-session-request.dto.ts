import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionRequestDto {
  @ApiProperty({
    description: 'The device of the session',
    example: 'IOS',
  })
  device: string;

  @ApiProperty({
    description: 'The ip of the session',
    example: '127.0.0.1',
  })
  ip: string;

  @ApiProperty({
    description: 'The user agent of the session',
    example:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  })
  userAgent: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;
}
