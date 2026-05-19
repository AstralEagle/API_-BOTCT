import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateGameDto {
  @IsNumber()
  @Max(15)
  @Min(5)
  max_players: number;
}
