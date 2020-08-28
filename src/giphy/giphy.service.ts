import { HttpService, Injectable } from '@nestjs/common';

import { GiphyConfig } from './config';

@Injectable()
export class GiphyService {
    constructor(private config: GiphyConfig, private http: HttpService) {}

    searchByKeyword(keyword: string) {
        return this.http.get(
            `${this.config.gifSearchUrl()}?api_key=${this.config.apiKey()}&q=${keyword}`
        );
    }
}
