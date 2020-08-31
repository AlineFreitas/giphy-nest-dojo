import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GiphyModule } from './giphy/giphy.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GiphyModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
