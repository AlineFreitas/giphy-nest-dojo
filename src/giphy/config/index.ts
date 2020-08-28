import { Injectable } from '@nestjs/common';

@Injectable()
export class GiphyConfig {
  apiKey(): string {
    return process.env.API_KEY;
  }

  gifSearchUrl(): string {
    return process.env.GIPHY_SEARCH_URL;
  }
}
