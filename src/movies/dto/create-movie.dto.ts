//data trasfer object 유효성검사 파이프라인
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })  
  readonly genres: string[];
}
