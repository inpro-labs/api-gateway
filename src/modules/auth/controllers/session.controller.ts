import { Controller, Param, Patch } from '@nestjs/common';
import { SessionService } from '../services/session.service';
import { ApiConsumes, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

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
  async revokeSession(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.sessionService.revokeSession(id, userId);
  }
}
