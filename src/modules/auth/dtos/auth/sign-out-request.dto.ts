import { ApiProperty } from '@nestjs/swagger';

export class SignOutRequestDto {
  @ApiProperty({
    description: 'The access token of the user',
    example: 'test@test.com',
  })
  accessToken: string;
}
