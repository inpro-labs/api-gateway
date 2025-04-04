import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CqrsModule.forRoot(), AuthModule],
})
export class AppModule {}
