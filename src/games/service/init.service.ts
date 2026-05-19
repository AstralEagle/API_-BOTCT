import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { PopulateGameDto } from '../dto/populate-game.dto';
import { GAME_COMPOSITION } from '../constants/game-composition';
import { Role } from '@prisma/client';

@Injectable()
class GamesInitService {
  constructor(private prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto, req) {
    console.log(createGameDto);

    const game = await this.prisma.game.create({
      data: {
        maxPlayer: createGameDto.max_players,
        masterId: req.user.id,
      },
    });

    await this.prisma.player.create({
      data: {
        gameId: game.id,
        userId: req.user.id,
        name: req.user.name,
      },
    });

    return `Game ${game.id} created!`;
  }

  async getPlayerList(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: { players: true },
    });

    if (!game) throw new Error('Game not found');

    return {
      count: game.players.length,
      players: game.players.map((player) => ({
        name: player.name,
        id: player.id,
      })),
    };
  }

  async populateGame(gameId: string, populateGameDto: PopulateGameDto) {
    await this.prisma.player.createMany({
      data: populateGameDto.players.map((player) => ({
        gameId,
        name: player,
      })),
    });

    return { message: 'Game populated', players: populateGameDto.players };
  }

  async launchGame(req, gameId: string) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) throw new Error('Game not found');

    if (game.masterId !== req.user.id)
      throw new Error('You are not the master of this game');

    // Recuperer les joueurs du jeu
    const players = await this.prisma.player.findMany({
      where: { gameId },
    });

    // Recuperer la composition des role a partir du nombre de joueur.
    const roleComposition: [number, number, number, number] = GAME_COMPOSITION[
      players.length
    ] || [0, 0, 0, 0];

    console.log(`Players => ${players.length}`);

    this.buildRoleComposition(roleComposition);

    return 'Launched';

    // Definir les role a chaque joueur.
  }

  // Private Function
  private async buildRoleComposition(
    defaultComposition: [number, number, number, number],
  ) {
    const currentComposition = [...defaultComposition];

    // Recuperer les Role a partir de la composition des role.
    // Villageois, Étrangers, Sbire, Démons
    const role: Role[][] = [[], [], [], []];
    const allRole = await this.prisma.role.findMany();
    // On part du demon pour finir sur les villageois.
    // On le fait 1a 1 car la composition peut changer.
    //Les demons
    for (let i = 4; i > 0; i--) {
      // const roleSelected = await this.selectRandomRole(
      //   allRole.filter((x) => x.team === 4),
      // );
      // role[3].push(roleSelected.id);
      const currentRolePosition = currentComposition[i - 1];
      let currentRoleSelectable = allRole.filter((x) => x.team === i);

      console.log(`${i} => ${currentRolePosition}`);
      console.log(
        `Role => ${currentRoleSelectable.map((x) => x.name).join('; ')}`,
      );
      for (let j = 0; j < currentRolePosition; j++) {
        const roleSelected = await this.selectRandomRole(currentRoleSelectable);
        if (!roleSelected) throw new Error('Pas assez de role disponible !');
        role[i - 1].push(roleSelected);
        currentRoleSelectable = currentRoleSelectable.filter(
          (x) => x.id !== roleSelected.id,
        );

        // Condition spéciale si le Baron est ajouter, Il faut retirer 2 Villageois et ajouter 2 Étranger
        if (i == 3 && roleSelected.id === 21) {
          currentComposition[0] = currentComposition[0] - 2;
          currentComposition[1] = currentComposition[1] + 2;
        }
      }
    }
    console.log(role);
  }

  private async selectRandomRole(role: Role[]) {
    if (role.length === 0) {
      console.error('Pas assez de role disponible !');
      return;
    }
    const randomIndex = Math.floor(Math.random() * role.length);
    return role[randomIndex];
  }
}

export default GamesInitService;
