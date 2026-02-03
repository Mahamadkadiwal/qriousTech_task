import { Test, TestingModule } from '@nestjs/testing';
import { TasknestController } from './tasknest.controller';
import { TasknestService } from './tasknest.service';

describe('TasknestController', () => {
  let controller: TasknestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasknestController],
      providers: [TasknestService],
    }).compile();

    controller = module.get<TasknestController>(TasknestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
