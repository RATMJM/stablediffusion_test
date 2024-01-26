import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { userinfo as UserInfo, Prisma } from '@prisma/client'
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies') //   End point URL name
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { } //MoviesService class 요청

  @Get('user/:userId')
  async getAllUserInfo(@Param('userId') userId: number): Promise<UserInfo[]> {
    console.log(typeof userId + ' ' + userId + 'what??');
    return await this.moviesService.getAllUserInfo(userId);
  }

  @Get('user/contents/:userId')
  async userContents(@Param('userId') userId: number): Promise<UserInfo[]> {
    console.log(typeof userId + ' ' + userId + 'what contents??');
    return await this.moviesService.userContents(userId);
  }

  @Get()
  getAll(): Movie[] {
    console.log('hii');
    return this.moviesService.getAll();
    //   getAll() {
    // return 'this will return all movies';
  }

  //   @Get('search')
  //   search(@Query('year') searchingYear: string) {
  //     // url Query
  //     return `we are searching a ansewer title year : ${searchingYear}`;
  //   }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    console.log(typeof movieId);
    return this.moviesService.getOne(movieId);
  }

  //   @Post()
  //   create(@Body() movieData) {
  // console.log(movieData);
  //     return movieData;
  //   }
  @Post()
  create(@Body() movieData: CreateMovieDto) { // movieData의 BODY를 가져옴
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete()
  removeAll() {
    return this.moviesService.deleteAll();
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  //   @Patch(':id') // PATCH(제이슨?요소.리소스일부분만 업데이트), PUT(리소스전체 업데이트)
  //   patch(@Param('id') movieId: string, @Body() updateData) {
  //     // return `this will patch a movie ${movieId}`;
  //     return {
  //       updateMovie: movieId, //:id
  //       ...updateData, //오브젝트 send
  //     };
  //   }
  @Patch(':id') // PATCH(리소스일부분만 업데이트), PUT(리소스전체 업데이트)
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    // return `this will patch a movie ${movieId}`;
    return this.moviesService.update(movieId, updateData);
  }



  // @Get('user/:userId')
  // async getAllUserInfo(@Param('userId') userId: number): Promise<UserInfo[]> {
  //   console.log(typeof userId + ' ' + userId + 'what??');
  //   return await this.moviesService.getAllUserInfo(userId);
  // } 

  @Patch('userInfo/nickName/:userId') // PATCH(리소스일부분만 업데이트), PUT(리소스전체 업데이트)
  async updateUserInfo(@Param('userId') userId: number): Promise<UserInfo[]> {
    // return `this will patch a movie ${movieId}`;
    console.log('1??');
    return await this.moviesService.updateUserInfo(userId);
  }
  //   @Post()
  //   getUserId(@Body() UserId) {
  //     // console.log(UserId);
  //     return {
  //       ...UserId,
  //     };
  //   }

}
