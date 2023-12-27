import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorLoggerMiddleware } from './middleware/error.log.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(ErrorLoggerMiddleware);
  //app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
