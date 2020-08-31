import { Controller, Get, Query } from '@nestjs/common';
import { GiphyService } from './giphy.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GifList } from './domain/gif-list.dto';

@Controller('giphy')
export class GiphyController {
  constructor(private service: GiphyService) {}

  @Get()
  searchByKeyword(@Query('keyword') keyword: string): Observable<GifList> {
    return this.service.searchByKeyword(keyword)
      .pipe(
        map(response => response.data)
      );
  }
}
