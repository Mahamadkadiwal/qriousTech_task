import { PartialType } from '@nestjs/mapped-types';
import { CreateTasknestDto } from './create-tasknest.dto';

export class UpdateTasknestDto extends PartialType(CreateTasknestDto) {}
