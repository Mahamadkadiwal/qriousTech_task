import { IsNotEmpty, IsString } from 'class-validator';

export class AssignPerDto {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  feature: string;

  @IsNotEmpty()
  @IsString()
  permission: string;
}
