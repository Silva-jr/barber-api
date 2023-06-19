import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
   
   //Configurando o Swagguer API
   const config = new DocumentBuilder()
    .setTitle('Barber Api')
    //.setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('barber')
    .build();
   const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');  
  await app.listen(3000);
}
bootstrap();
