import { Test, TestingModule } from '@nestjs/testing';
import { UnknownBugService } from './unknown-bug.service';

describe('UnknownBugService', () => {
  let service: UnknownBugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnknownBugService],
    }).compile();

    service = module.get<UnknownBugService>(UnknownBugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
