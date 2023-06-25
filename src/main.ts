import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //, {  logger: ['error', 'warn', 'verbose'],});

  app.use(
    session({
      secret: 'your_session_secret_password',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 360000 }
  }));

app.use(passport.initialize());
app.use(passport.session());

const config: ConfigService = app.get(ConfigService);
const port: number = config.get<number>('PORT');

  const configSwagger = new DocumentBuilder()
  .setTitle('NestJS is awesome!')
  .setDescription('Example REST API NestJS')
  .setVersion('0.1.0')
  .addTag('ENDPOINTS')
  .build();
  
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }), 
  );
  await app.listen(port);
}

bootstrap();
 