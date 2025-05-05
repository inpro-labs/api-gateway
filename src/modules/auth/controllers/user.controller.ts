import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserRequestDto } from '../dtos/user/create-user-request.dto';
import { CreateUserResponseDto } from '../dtos/user/create-user-response.dto';
import { UserService } from '../services/user.service';
import { Public } from '@/shared/infra/security/jwt/decorators/public.decorator';
import { Principal } from '@/shared/infra/security/jwt/decorators/principal.decorator';
import { User } from '@/shared/types/principal';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserRequestDto, description: 'User request' })
  @ApiResponse({
    type: CreateUserResponseDto,
    description: 'User response',
  })
  @ApiConsumes('application/json')
  async createUser(@Body() body: CreateUserRequestDto) {
    return this.userService.createUser(body);
  }

  @Get('me/sessions')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Get user sessions by ID' })
  @ApiConsumes('application/json')
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'Number of sessions to take',
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    description: 'Number of sessions to skip',
  })
  async getUserSessions(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Principal() user: User,
  ) {
    return this.userService.listUserSessions({
      userId: user.userId,
      take,
      skip,
    });
  }
}
