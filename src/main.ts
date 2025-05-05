import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GatewayExceptionFilter } from './shared/infra/nest/filters/gateway-exception.filter';
import { HttpStatusCodeInterceptor } from './shared/infra/nest/interceptors/http-status-code.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const adapter = new ExpressAdapter();
  const app = await NestFactory.create(AppModule, adapter);

  const config = new DocumentBuilder()
    .setTitle('InPro API')
    .setVersion('0.1')
    .setContact(
      'Maxwell Macedo',
      'https://github.com/MaxwellOlliver',
      'maxwell.macedo@moondev.com.br',
    )
    .setDescription('Here is the API documentation for InPro')
    .addServer('http://localhost:3000')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync(
    join(__dirname, '..', 'docs', 'api.json'),
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
