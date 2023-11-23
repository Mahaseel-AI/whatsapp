import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CallbackService } from './callback.service';
import { NotificationPayloadDTO } from './dto/notification-payload';
import { ReplyService } from './reply/reply.service';

@Controller('callback')
export class CallbackController {
  constructor(
    private readonly callbackService: CallbackService,
    private readonly replyService: ReplyService,
  ) {}

  @Get('/webhook')
  getWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ): string {
    if (this.callbackService.verifyToken(mode, token)) {
      return challenge;
    }
    throw new ForbiddenException('Access Denied');
  }

  @Post('/webhook')
  postWebhook(@Body() body: NotificationPayloadDTO): string {
    this.callbackService.create(body);
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      this.replyService.sendSimpleAwayMessage(
        body.entry[0].changes[0].value.messages[0].from,
      );
    }

    return 'callback saved';
  }
}
