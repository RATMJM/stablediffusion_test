import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  console.log('started');
  const fs = require('fs');
  const ssl = process.env.SSL === 'true' ? true : false;
  let httpsOptions = null;
  console.log(ssl);
  if (ssl) {
    console.log(ssl);
    httpsOptions = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    };
  }
  console.log(fs.readFileSync(process.env.SSL_KEY_PATH) + '     ' + fs.readFileSync(process.env.SSL_CERT_PATH))
  const app = await NestFactory.create(AppModule, { httpsOptions });
  const configService = app.get(ConfigService); // env 서비스 


  // const app = await NestFactory.create(TodoModule);
  app.enableShutdownHooks();
  // whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
  // forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
  // transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }), //데이터 오브젝트 유효성 검사
  );

  app.listen(process.env.SSL_PORT, () => {
    // console.log(`Server started on port ${configService.get<number>("PORT")}`);
    console.log(`Server started on port ${process.env.SSL_PORT}`);
  });

}
bootstrap();
//restapi 자동생성 nest  g res [프로젝트도메인이름]:

  // 대략적 구조
//                                         <-> controller
//                           <->  module1  <-> service 
//                                          
// main.ts <-> app.module.ts <->  module2  <-> controller
//                                         <-> service
//
//                           <->  module3  <-> controller
//                                         <-> service