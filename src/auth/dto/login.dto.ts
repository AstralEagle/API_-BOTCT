import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string; // ou email selon ta préférence

  @IsString()
  password: string;
}
