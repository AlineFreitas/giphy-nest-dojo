import { HttpService, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GiphyConfig } from './config';
import { GifList } from './domain/gif-list.dto';
import { Observable, pipe } from 'rxjs';
import { map, pluck, catchError } from 'rxjs/operators';

@Injectable()
export class GiphyService {
  constructor(private config: GiphyConfig, private http: HttpService) {
  }

  searchByKeyword(keyword: string): Observable<GifList> {
    return this.http.get(
      this.config.gifSearchUrl(), {
        params: {
          api_key: this.config.apiKey(),
          q: keyword
        }
      }).pipe(
        pluck('data', 'data'),
        map(entries => entries.map(entry => entry.url)),
        catchError(error => {
          throw new HttpException('Internal Error.', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }
}
