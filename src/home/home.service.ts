import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Request } from 'express';

@Injectable()
export class HomeService {
  create(createHomeDto: CreateHomeDto) {
    return 'This action adds a new home';
  }

  findAll(request: Request) {
    console.log(request);
    return request.url;
  }

  findOne(id: number, name: string) {
    const item = {
      id,
      value: 'This is a simple value',
      name,
    };
    return item;
  }

  update(id: number, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
}
