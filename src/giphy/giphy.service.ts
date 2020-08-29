import { HttpService, Injectable } from '@nestjs/common';
import { GiphyConfig } from './config';
import { GifList } from './domain/gif-list.dto';
import { Observable, pipe } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

@Injectable()
export class GiphyService {
  constructor(private config: GiphyConfig, private http: HttpService) {}

  searchByKeyword(keyword: string): Observable<GifList> {
    return this.http.get(
      `${this.config.gifSearchUrl()}?api_key=${this.config.apiKey()}&q=${keyword}`
    ).pipe(
      pluck('data', 'data'),
      map(entries => entries.map(entry => entry.url)),
    );
  }
}
