import { Test, TestingModule } from '@nestjs/testing';
import { GiphyController } from '../giphy.controller';
import { GiphyService } from '../giphy.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GifList } from '../domain/gif-list.dto';
import { GiphyConfig } from '../config';
import { HttpModule } from '@nestjs/common';

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

    it('deve chamar o service', () => {
        jest
            .spyOn(service, 'searchByKeyword')
            .mockImplementation(() => of(undefined));

        controller.searchByKeyword('a');
        expect(service.searchByKeyword).toHaveBeenCalledWith('a');
    });

    it('fetches gif list by keyword', async done => {
        const keyword = 'keyword';
        const gifList: GifList = [
            "https://giphy.com/gifs/boxing-coach-knowledge-GWjUw6yjJcGME",
            "https://giphy.com/gifs/miguelcotto-boxing-miguel-cotto-3oEduSLalG3rotykI8"
        ];

        jest
            .spyOn(service, 'searchByKeyword')
            .mockImplementation(() => of(gifList));

        controller.searchByKeyword(keyword).subscribe(
            respostaObtida => {
                expect(respostaObtida).toEqual(gifList);
                done();
            }
        );
    });
});
