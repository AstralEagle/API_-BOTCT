import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class PopulateGameDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  players: string[];
}
