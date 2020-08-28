import { Controller, Get, Query } from '@nestjs/common';
import { GiphyService } from './giphy.service';

@Controller('giphy')
export class GiphyController {
    constructor(private service: GiphyService) {}

    @Get()
    searchByKeyword(@Query('q') keyword: string) {
        return this.service.searchByKeyword(keyword);
    }
}
