import { Test, TestingModule } from '@nestjs/testing';
import { KnownBugController } from './known-bug.controller';
import { KnownBugService } from './known-bug.service';

describe('KnownBugController', () => {
  let controller: KnownBugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnownBugController],
      providers: [KnownBugService],
    }).compile();

    controller = module.get<KnownBugController>(KnownBugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
