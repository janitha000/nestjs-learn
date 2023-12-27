import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { Connection } from 'src/services/conntection';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [HomeController],
  imports: [ConfigModule],
  providers: [
    HomeService,
    {
      provide: 'CONNECTION',
      useValue: Connection,
    },
  ],
})
export class HomeModule {}
