import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from './shared/infra/security/jwt/jwt.module';
import { EnvModule } from './config/env/env.module';

@Module({
  imports: [JwtModule, EnvModule, AuthModule],
})
export class AppModule {}
