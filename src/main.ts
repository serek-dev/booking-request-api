import { NestFactory } from "@nestjs/core";
import { AppModule } from "./infrastructure/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(80);
}

bootstrap();
