import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { SignInRequestDto } from '../dtos/auth/sign-in-request.dto';
import { SignInResponseDto } from '../dtos/auth/sign-in-response.dto';
import { AuthService } from '../services/auth.service';
import { RefreshTokenRequestDto } from '../dtos/auth/refresh-token-request.dto';
import { RefreshTokenResponseDto } from '../dtos/auth/refresh-token-response.dto';
import { SignOutResponseDto } from '../dtos/auth/sign-out-response.dto';
import { Public } from '@/shared/infra/security/jwt/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: SignInRequestDto, description: 'Sign in request' })
  @ApiResponse({
    type: SignInResponseDto,
    description: 'Sign in response',
  })
  @ApiConsumes('application/json')
  async signIn(@Body() body: SignInRequestDto) {
    return this.authService.signIn(body);
  }

  @Delete('sign-out')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Sign out a user' })
  @ApiConsumes('application/json')
  @ApiResponse({
    type: SignOutResponseDto,
    description: 'Sign out response',
  })
  async signOut() {
    return this.authService.signOut();
  }

  @Public()
  @Post('/refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({
    type: RefreshTokenRequestDto,
    description: 'Refresh token request',
  })
  @ApiResponse({
    type: RefreshTokenResponseDto,
    description: 'Refresh token response',
  })
  @ApiConsumes('application/json')
  async refreshToken(@Body() body: RefreshTokenRequestDto) {
    return this.authService.refreshToken(body);
  }
}
