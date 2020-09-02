import { Test, TestingModule } from '@nestjs/testing';
import { GiphyService } from '../giphy.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { GiphyConfig } from '../config';

describe('GiphyService', () => {
  let service: GiphyService;
  let httpService: HttpService;
  let config: GiphyConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiphyService, GiphyConfig],
      imports: [HttpModule]
    }).compile();

    service = module.get<GiphyService>(GiphyService);
    config = module.get<GiphyConfig>(GiphyConfig);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
