import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CULPICK API')
    .setDescription('The CULPICK API description')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Bearer',
      },
      'access-token',
    )
    .build();

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  });

  await app.listen(2020);

  console.log(`🚀 Server ready at http://localhost:2020`);
}
bootstrap();
