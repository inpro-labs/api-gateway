import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserRequestDto } from '../dtos/user/create-user-request.dto';
import { CreateUserResponseDto } from '../dtos/user/create-user-response.dto';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

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

  @Get(':id/sessions')
  @ApiOperation({ summary: 'Get a user sessions by ID' })
  @ApiConsumes('application/json')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
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
    @Param('id') id: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    return this.sessionService.listUserSessions(id, take, skip);
  }
}
