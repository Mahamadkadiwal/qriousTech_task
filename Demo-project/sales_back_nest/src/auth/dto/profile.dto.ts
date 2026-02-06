import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ProfileUpdateDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
