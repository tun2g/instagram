import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {  SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { CorsMiddleware } from './config/corsConfig';
import { options } from './config/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();


const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
  app.use(cors({
    origin: `${process.env.CLIENT_API}`,
    methods: ["GET", "POST"],
    credentials: true,
  }))

  app.use(new CorsMiddleware().use)
  await app.listen(3333);
}
bootstrap();
