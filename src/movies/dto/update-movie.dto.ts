//data trasfer object 유효성검사 파이프라인
// import { IsNumber, IsString } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types"
import { CreateMovieDto } from "./create-movie.dto";
export class UpdateMovieDto extends PartialType(CreateMovieDto){ 
    
}



  //물음표는 title이나 year만 수정할 수도 있기떄문에 붙임
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsString({ each: true })
//   readonly genres?: string[];