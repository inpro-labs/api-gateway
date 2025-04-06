import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SessionService } from '../services/session.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { CreateSessionRequestDto } from '../dtos/session/create-session-request.dto';
import { CreateSessionResponseDto } from '../dtos/session/create-session-response.dto';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new session' })
  @ApiBody({ type: CreateSessionRequestDto, description: 'Session request' })
  @ApiResponse({
    type: CreateSessionResponseDto,
    description: 'Session response',
  })
  @ApiConsumes('application/json')
  async createSession(@Body() body: CreateSessionRequestDto) {
    return this.sessionService.createSession(body);
  }

  @Patch(':id/revoke')
  @ApiOperation({ summary: 'Revoke a session' })
  @ApiConsumes('application/json')
  @ApiParam({ name: 'id', type: String, description: 'Session ID' })
  async revokeSession(@Param('id') id: string) {
    return this.sessionService.revokeSession(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'List sessions for a user' })
  @ApiConsumes('application/json')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async listUserSessions(@Param('id') id: string) {
    return this.sessionService.listUserSessions(id);
  }
}
