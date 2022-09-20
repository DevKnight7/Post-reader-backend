import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  /**
   * enable cors with default options
   */
  app.enableCors();

  /**
   * global validation pipes setup with class-validator &
   * class-transformer npm packages.
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * swagger setup for documentation
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS - API')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'NestJS - API',
  });

  const config: ConfigService = app.get(ConfigService);
  await app.listen(config.get('PORT') || 3000, () =>
    logger.log(`Server started on port: ${config.get('PORT')}...`, 'main.ts'),
  );
}
bootstrap();
