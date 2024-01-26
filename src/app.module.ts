import { Module } from '@nestjs/common';
// import { AppController } from '../test/app.controller';
// import { AppService } from '../test/app.service';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './movies/app.controller';
import { CollectionsModule } from './collections/collections.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
// 루트 모듈
@Module({
  imports: [MoviesModule, CollectionsModule, UsersModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:
      process.env.NODE_ENV === 'production'
        ? '.env.production'
        : process.env.NODE_ENV === 'stage'
          ? '.env.stage'
          : '.env.dev'
  })],
  controllers: [AppController], // url 가져오기, 함수 실행하기, Express의 router 역할
  // providers: [ConnectionService],
})
export class AppModule {

}
