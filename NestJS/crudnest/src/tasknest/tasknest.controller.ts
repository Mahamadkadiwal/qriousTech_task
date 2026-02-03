import { Body, Controller, Post } from '@nestjs/common';
import { CreateTasknestDto } from './dto/create-tasknest.dto';
import { TasknestService } from './tasknest.service';

@Controller('tasknest')
export class TasknestController {
  constructor(private readonly tasknestService: TasknestService) {}

  @Post()
  create(@Body() createTasknestDto: CreateTasknestDto) {
    return this.tasknestService.create(createTasknestDto);
  }
}
