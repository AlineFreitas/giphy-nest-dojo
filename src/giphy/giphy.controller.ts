import { Controller } from '@nestjs/common';
import { GiphyService } from './giphy.service';

@Controller('giphy')
export class GiphyController {
    constructor(private service: GiphyService) {}

    searchByKeyword(keywords: string) {
        return this.service.searchByKeyword(keywords);
    }
}
