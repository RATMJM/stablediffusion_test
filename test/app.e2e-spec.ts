import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => { 실행할 떄 마다 새 application 실행
  beforeAll(async () => { // 한번만 application 실행 후 테스트 수행
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }), //데이터 오브젝트 유효성 검사
    );
    await app.init();
  });

  it('/ (GET)', () => { //Url 접속 체크 
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  it('/movies (GET)', () => { //영화목록
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
  });

  describe('/movies', () => { //영화목록
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
  });
  it('POST 201', () => {  // 데이터 입력 체크
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test']
      })
      .expect(201);
  });

  it('POST 400', () => { // 없는데이터 입력 시 
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
        other: 'thing'
      })
      .expect(400);
  });

  // it('DELETE', () => { // 모든 movies 삭제 
  //   return request(app.getHttpServer()) //
  //     .delete('/movies').expect(404);
  // })

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer()).patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });

  });
});
