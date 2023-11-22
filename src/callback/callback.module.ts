import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';
import { CallbackService } from './callback.service';
import { ReplyService } from './reply/reply.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CallbackController],
  providers: [CallbackService, ReplyService],
})
export class CallbackModule {}
