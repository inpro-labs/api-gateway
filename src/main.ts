import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GatewayExceptionFilter } from './shared/infra/filters/gateway-exception.filter';
import { HttpStatusCodeInterceptor } from './shared/infra/interceptors/http-status-code.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
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

  writeFileSync(
    path.join(__dirname, '..', 'docs', 'api.json'),
    JSON.stringify(document, null, 2),
  );

  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new GatewayExceptionFilter());
  app.useGlobalInterceptors(new HttpStatusCodeInterceptor());

  app.enableCors();
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
