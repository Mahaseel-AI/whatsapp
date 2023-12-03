import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { LangChainService } from 'src/callback/helpers/langchain.helper';

@Module({
  controllers: [MessageController],
  providers: [MessageService, LangChainService],
})
export class MessageModule {}
