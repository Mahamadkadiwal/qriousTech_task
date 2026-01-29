import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Feature must be at least 3 characters' })
  @MaxLength(20, { message: 'Feature must be at most 20 characters' })
  @IsString()
  feature: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Permission name must be at least 3 characters' })
  @MaxLength(20, { message: 'Permission name must be at most 20 characters' })
  @IsString()
  name: string;
}
