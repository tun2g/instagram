import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { CorsMiddleware } from './config/corsConfig';
import fileupload from 'express-fileupload'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const options = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API Documentation')
  .setVersion('1.0')
  .addTag('api')
  .build();

const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(cors({
    origin: `${process.env.CLIENT_API}`,
    methods: ["GET", "POST"],
    credentials: true,
  }))

  app.use(new CorsMiddleware().use)
  await app.listen(3333);
}
bootstrap();
