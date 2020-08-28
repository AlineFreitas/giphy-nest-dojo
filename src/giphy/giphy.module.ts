import { HttpModule, Module } from '@nestjs/common';
import { GiphyController } from './giphy.controller';
import { GiphyService } from './giphy.service';
import { GiphyConfig } from './config';

@Module({
  controllers: [GiphyController],
  providers: [GiphyService, GiphyConfig],
  imports: [HttpModule],
})
export class GiphyModule {}
