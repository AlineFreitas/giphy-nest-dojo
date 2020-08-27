import { Test, TestingModule } from '@nestjs/testing';
import { GiphyController } from './giphy.controller';
import { GiphyService } from './giphy.service';
import { of } from 'rxjs';

describe('GiphyController', () => {
  let controller: GiphyController;
  let service: GiphyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiphyController],
      providers: [GiphyService],
      imports: [],
    }).compile();

    controller = module.get<GiphyController>(GiphyController);
    service = module.get<GiphyService>(GiphyService);
  });

it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service', () => {
    jest
        .spyOn(service, 'searchByKeyword')
        .mockImplementation(() => of(undefined));
    
    controller.searchByKeyword('a');
    expect(service.searchByKeyword).toHaveBeenCalledWith('a');
  });
});
