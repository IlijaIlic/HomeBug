import { Test, TestingModule } from '@nestjs/testing';
import { KnownBugService } from './known-bug.service';

describe('KnownBugService', () => {
  let service: KnownBugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnownBugService],
    }).compile();

    service = module.get<KnownBugService>(KnownBugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
