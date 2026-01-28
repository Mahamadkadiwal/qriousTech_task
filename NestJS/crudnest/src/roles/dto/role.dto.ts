import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Role name must be at least 3 characters' })
  @MaxLength(20, { message: 'Role name must be at most 20 characters' })
  @IsString()
  name: string;
}
