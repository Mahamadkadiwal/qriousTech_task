import { Module } from '@nestjs/common';
import { TasknestService } from './tasknest.service';
import { TasknestController } from './tasknest.controller';

@Module({
  controllers: [TasknestController],
  providers: [TasknestService],
})
export class TasknestModule {}
