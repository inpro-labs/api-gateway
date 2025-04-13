import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GatewayExceptionFilter } from './shared/filters/gateway-exception.filter';
import { HttpStatusCodeInterceptor } from './shared/interceptors/http-status-code.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const adapter = new ExpressAdapter();
  const app = await NestFactory.create(AppModule, adapter);

  const config = new DocumentBuilder()
    .setTitle('InPro API')
    .setDescription('Here is the API documentation for InPro')
    .setVersion('1.0')
    .addTag('Auth Service')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new GatewayExceptionFilter());
  app.useGlobalInterceptors(new HttpStatusCodeInterceptor());

  app.enableCors();
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
