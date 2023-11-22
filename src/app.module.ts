import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallbackModule } from './callback/callback.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [CallbackModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
