import { Test, TestingModule } from '@nestjs/testing';
import { GiphyService } from '../giphy.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { GiphyConfig } from '../config';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { GifList } from '../domain/gif-list.dto';

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

  describe('Consulta no giphy por keyword', () => {
    const keyword = 'keyword';
    const gifList: GifList = [
      "https://giphy.com/gifs/boxing-coach-knowledge-GWjUw6yjJcGME",
      "https://giphy.com/gifs/miguelcotto-boxing-miguel-cotto-3oEduSLalG3rotykI8"
    ];

    const searchURL = 'http://localhost/gif/search';
    const apiKey = 'API_KEY';

    beforeEach(async () => {

      const resposta: AxiosResponse = {
        data: gifList,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(resposta));
    })

    it('Http GET é acionado', ()=> {
      service.searchByKeyword(keyword);
      expect(httpService.get).toHaveBeenCalled();
    });

    it('Requisição é executada com a URL correta', () => {
      jest
        .spyOn(config, 'gifSearchUrl')
        .mockReturnValue(searchURL);

      jest.spyOn(config, 'apiKey').mockReturnValue(apiKey);

      service.searchByKeyword(keyword);

      expect(httpService.get).toHaveBeenCalledWith(searchURL, { params: { api_key: apiKey, q: keyword } })
    });
  });
});
