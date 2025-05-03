import { Controller, Param, Patch } from '@nestjs/common';
import { SessionService } from '../services/session.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { RevokeSessionResponseDto } from '../dtos/session/revoke-session-response.dto';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Patch(':id/revoke')
  @ApiOperation({ summary: 'Revoke a session' })
  @ApiConsumes('application/json')
  @ApiParam({ name: 'id', type: String, description: 'Session ID' })
  @ApiQuery({
    name: 'userId',
    type: String,
    description: 'User ID',
  })
  @ApiResponse({
    type: RevokeSessionResponseDto,
    description: 'Revoke session response',
  })
  async revokeSession(@Param('id') id: string) {
    return this.sessionService.revokeSession(id);
  }
}
