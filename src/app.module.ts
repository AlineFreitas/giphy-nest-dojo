import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GiphyModule } from './giphy/giphy.module';

@Module({
  imports: [GiphyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
