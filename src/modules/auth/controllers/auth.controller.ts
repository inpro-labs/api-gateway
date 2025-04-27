import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { SignInRequestDto } from '../dtos/auth/sign-in-request.dto';
import { SignInResponseDto } from '../dtos/auth/sign-in-response.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: SignInRequestDto, description: 'Sign in request' })
  @ApiResponse({
    type: SignInResponseDto,
    description: 'Sign in response',
  })
  @ApiConsumes('application/json')
  async signIn(
    @Body() body: SignInRequestDto,
    @Headers() headers: Record<string, string>,
  ) {
    return this.authService.signIn(body, {
      correlationId: headers.correlationId,
      requestId: headers.requestId,
    });
  }
}
