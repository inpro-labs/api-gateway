import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GatewayExceptionFilter } from './shared/filters/gateway-exception.filter';
import { HttpStatusCodeInterceptor } from './shared/interceptors/http-status-code.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
