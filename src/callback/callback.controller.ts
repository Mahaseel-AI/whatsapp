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
  async postWebhook(@Body() body: NotificationPayloadDTO): Promise<string> {
    if (body.entry[0]?.changes[0]?.value?.messages[0]?.type === 'text') {
      console.log(body.entry[0].changes[0].value.messages[0].text.body);
      await this.callbackService.create(body);
      await this.replyService.sendSimpleAwayMessage(
        body.entry[0].changes[0].value.messages[0].from,
        body.entry[0].changes[0].value.contacts[0].profile.name,
      );
    }
    console.log('ignore callback not saved');
    return 'ignore callback not saved';
  }
}
