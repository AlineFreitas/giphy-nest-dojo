import {
  ForbiddenException,
  HttpModule,
  HttpService,
  HttpStatus,
  INestApplication,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import * as request from 'supertest';

import { GiphyModule } from '../giphy.module';
import { GiphyService } from '../giphy.service';
import { GiphyConfig } from '../config';

import * as giphySearchResponse from './fixtures/giphy-search-response.json';
import { giflist} from './fixtures/gif-list';

describe('Giphy', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [GiphyModule, HttpModule],
      providers: [GiphyService, GiphyConfig],
    }).compile();

    app = moduleRef.createNestApplication();
    httpService = moduleRef.get<HttpService>(HttpService);
    await app.init();
  });

  describe('GET /giphy', () => {
    describe('Com sucesso', () => {
      it('retorna status 200', () => {
        const response: AxiosResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          data: {},
        };

        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

        return request(app.getHttpServer())
          .get('/giphy')
          .query({
            "keyword": "addams family"}
          )
          .expect(res => {
            expect(res.status).toBe(HttpStatus.OK);
          });
      });

      xit('retorna dados no formato correto', () => {
        const response: AxiosResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          data: giphySearchResponse,
        };

        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

        return request(app.getHttpServer())
          .get('/giphy')
          .query({
            "keyword": "morticia addams"}
          )
          .expect(res => {
            expect(res.status).toBe(HttpStatus.OK);
            expect(res.body).toEqual(giflist);
          });
      });
    });

    describe('Em caso de falha', () => {
      it('Repassa Internal Server Error', () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => throwError(new InternalServerErrorException()));
        return request(app.getHttpServer())
          .get('/giphy')
          .query({
            "keyword": "addams family"}
          )
          .expect(res => {
            expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
          });
      });

      it('Repassa não autorizado', () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => throwError(new UnauthorizedException()));

        return request(app.getHttpServer())
          .get('/giphy')
          .query({
            "keyword": ""
          })
          .expect(res => {
            expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
          });
      });

      it('Repassa proibido', () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => throwError(new ForbiddenException()));

        return request(app.getHttpServer())
          .get('/giphy')
          .query({
            "keyword": ""
          })
          .expect(res => {
            expect(res.status).toBe(HttpStatus.FORBIDDEN);
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
