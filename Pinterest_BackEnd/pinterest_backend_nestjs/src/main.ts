import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UseGuards, ValidationPipe } from '@nestjs/common';
import { ErrorValidate } from './types/ErrorValidate';
import { AuthGuard } from '@nestjs/passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Pinterest')
    .setDescription(
      'The pinterest api description: test with account email: admin@gmail.com and password: passwordadmin1@',
    )
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors) {
        const messages = errors.map((err) => {
          return {
            key: err.property,
            errors: err.constraints,
          } as ErrorValidate;
        });
        throw new BadRequestException(messages);
      },
    }),
  );
  await app.listen(1234);
}
bootstrap();
