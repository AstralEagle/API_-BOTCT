import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateGameDto } from '../dto/create-game.dto';
import GamesInitService from '../service/init.service';
import { PopulateGameDto } from '../dto/populate-game.dto';

@Controller('games/init')
export class GamesInitController {
  constructor(private readonly gamesService: GamesInitService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createGameDto: CreateGameDto) {
    return await this.gamesService.create(createGameDto, req);
  }

  @Get('/:id/players')
  async getPlayerList(@Param('id') id: string) {
    return await this.gamesService.getPlayerList(id);
  }

  @Post('/:id/populate')
  async populateGame(
    @Param('id') id: string,
    @Body() populateGameDto: PopulateGameDto,
  ) {
    return await this.gamesService.populateGame(id, populateGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/launch')
  async launchGame(@Req() req, @Param('id') id: string) {
    return await this.gamesService.launchGame(req, id);
  }
}
