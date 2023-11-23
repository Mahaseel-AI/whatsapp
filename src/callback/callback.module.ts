import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';
import { CallbackService } from './callback.service';
import { ReplyService } from './reply/reply.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Callback, CallbackSchema } from './schemas/callback.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Callback.name, schema: CallbackSchema },
    ]),
  ],
  controllers: [CallbackController],
  providers: [CallbackService, ReplyService],
})
export class CallbackModule {}
