import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    console.log('why https no!');
    return 'This action adds a new user';
  }

  findAll() {
    let variable = 0;
    for (let i = 0; i < 1000000; i++) {
      variable += i;
    }
    return `This action returns all users ${variable}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user shit`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
