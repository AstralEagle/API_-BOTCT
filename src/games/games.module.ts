import { Module } from '@nestjs/common';
import { GamesInitController } from './controller/init.controller';
import GamesInitService from './service/init.service';

@Module({
  controllers: [GamesInitController],
  providers: [GamesInitService],
})
export class GamesModule {}
