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
  HttpException,
  UseGuards,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { TimeLoggerInterceptor } from 'src/interceptor/time.logger.interceptor';
import { Connection } from 'src/services/conntection';
import { ConfigService } from '@nestjs/config';

@Controller('home')
@UseGuards(AuthGuard)
@UseInterceptors(TimeLoggerInterceptor)
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    @Inject('CONNECTION') connection: Connection,
    private configService: ConfigService,
  ) {}

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
  @Roles(['Admin'])
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
      NAME: this.configService.get<string>('NAME'),
    };
  }

  @Get('/exception/throw')
  throwException() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'This is a custom error',
      },
      HttpStatus.FORBIDDEN,

      {
        cause: 'This is a custom cause',
      },
    );
  }
}
