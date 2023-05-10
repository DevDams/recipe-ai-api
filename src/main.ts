import { ValidationPipe, RequestMethod } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

async function bootstrap() {
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'whatsapp', method: RequestMethod.POST }, { path: 'files/:imagename', method: RequestMethod.GET }, { path: 'auth/confirm/:token', method: RequestMethod.GET }],
  });
  app.useGlobalPipes(new ValidationPipe())
  app.use(bodyParser.json({ limit: "500000mb" }));
  app.use(
    bodyParser.urlencoded({ limit: "500000mb", extended: true }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
