import { Test, TestingModule } from '@nestjs/testing';
import { UnknownBugController } from './unknown-bug.controller';
import { UnknownBugService } from './unknown-bug.service';

describe('UnknownBugController', () => {
  let controller: UnknownBugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnknownBugController],
      providers: [UnknownBugService],
    }).compile();

    controller = module.get<UnknownBugController>(UnknownBugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
