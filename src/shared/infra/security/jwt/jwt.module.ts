import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Module({
  imports: [
    PassportModule,
    NestJwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    AuthService,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class JwtModule {}
