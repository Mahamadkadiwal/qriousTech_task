import { Test, TestingModule } from '@nestjs/testing';
import { TasknestService } from './tasknest.service';

describe('TasknestService', () => {
  let service: TasknestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasknestService],
    }).compile();

    service = module.get<TasknestService>(TasknestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
