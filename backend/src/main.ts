import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });
=======
  const app = await NestFactory.create(AppModule);
>>>>>>> 51097eff79b97f85eceec75cbc29f6534d4e557b
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      errorHttpStatusCode: 400,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
