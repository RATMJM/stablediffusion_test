import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { before } from 'node:test';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should thorw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 Not FOund');
      };
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      }); // 생성
      const allMovies = service.getAll().length; // 등록된 영화 갯수
      service.deleteOne(1); // 아이디1 지우면
      const afterDelete = service.getAll().length;// 등록된영화갯수 다시확인
      expect(afterDelete).toBeLessThan(allMovies); // 이전보다 등록된 영화갯수가 작으면 성공
    })
    it('should return 404 ', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 Not FOund');
      };
    })
  })

  describe('create', () => {
    it('should create a movie ', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      }); // 생성
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('update', () => {
    it('it should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      }); // 생성
      service.update(1, { title: 'updated test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated test');
    });
    it('should throw a NotFoundException ', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        // expect(e.message).toEqual('Movie with ID 999 Not FOund');
      };
    })
  });

});