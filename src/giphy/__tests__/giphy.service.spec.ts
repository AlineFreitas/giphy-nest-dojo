import { Test, TestingModule } from '@nestjs/testing';
import { GiphyService } from '../giphy.service';
import { HttpModule, HttpService, HttpException } from '@nestjs/common';
import { GiphyConfig } from '../config';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GifList } from '../domain/gif-list.dto';
import * as searchResponse from './fixtures/search-response.json';

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
        data: searchResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(resposta));

      jest
        .spyOn(config, 'gifSearchUrl')
        .mockReturnValue(searchURL);

      jest.spyOn(config, 'apiKey').mockReturnValue(apiKey);
    })

    it('Http GET é acionado', ()=> {
      service.searchByKeyword(keyword);

      expect(httpService.get).toHaveBeenCalled();
    });

    it('Requisição é executada com a URL correta', () => {
      service.searchByKeyword(keyword);

      expect(httpService.get).toHaveBeenCalledWith(`${searchURL}?api_key=${apiKey}&q=${keyword}`)
    });

    it('Interpreta a resposta corretamente', done => {
      service.searchByKeyword(keyword).subscribe(res => {
        expect(res).toEqual(gifList);
        done();
      });
    });

    describe('Quando ocorre um erro na requisição', () => {
      beforeEach(() => {
        const resposta: AxiosResponse = {
          data: searchResponse,
          status: 500,
          statusText: 'OK',
          headers: {},
          config: {},
        };

        jest
          .spyOn(httpService, 'get')
          .mockReturnValue(throwError(resposta));

      });

      it('Levanta exceção quando ocorre um erro', done => {
        service.searchByKeyword(keyword).subscribe({
          error: error => {
            expect(error).toBeInstanceOf(HttpException);
            done();
          }
        });
      });
    });
  });
});
