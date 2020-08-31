import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { GiphyConfig } from './config';
import { GifList } from './domain/gif-list.dto';

@Injectable()
export class GiphyService {
  constructor(private config: GiphyConfig, private http: HttpService) {
  }

  searchByKeyword(keyword: string): Observable<AxiosResponse<GifList>> {
    return this.http.get(
      this.config.gifSearchUrl(), {
        params: {
          api_key: this.config.apiKey(),
          q: keyword
        }
      });
  }
}
