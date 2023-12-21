import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  Header,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Request, Response } from 'express';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post()
  create(@Body() createHomeDto: CreateHomeDto) {
    return this.homeService.create(createHomeDto);
  }

  @Get()
  findAll(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
    const result = this.homeService.findAll(request);
    res.status(HttpStatus.CREATED).json(result);
  }

  @Get(':id')
  @Header('Cache-Control', 'none')
  @Header('X-Custom-Header', 'Janitha Tennakoon')
  findOne(@Param('id') id: string, @Query('name') name: string) {
    return this.homeService.findOne(+id, name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(+id, updateHomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(+id);
  }

  @Get(':id/house/:houseId')
  findOneHouse(@Param('id') id: string, @Param('houseId') houseId: string) {
    return {
      id,
      houseId,
    };
  }
}
