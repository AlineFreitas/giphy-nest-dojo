import { Test, TestingModule } from '@nestjs/testing';
import { GiphyController } from '../giphy.controller';
import { GiphyService } from '../giphy.service';
import { HttpModule } from '@nestjs/common';
import { GiphyConfig } from '../config';

describe('GiphyController', () => {
  let controller: GiphyController;
  let service: GiphyService;
  let giphyConfig: GiphyConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiphyController],
      providers: [GiphyService, GiphyConfig],
      imports: [HttpModule],
    }).compile();

    controller = module.get<GiphyController>(GiphyController);
    giphyConfig = module.get<GiphyConfig>(GiphyConfig);
    service = module.get<GiphyService>(GiphyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
