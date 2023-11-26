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
import { VerifyWebhook } from './helpers/webhook.helper';
import { MessageTemplate } from './templates/messages.template';

@Controller('callback')
export class CallbackController {
  constructor(
    private readonly callbackService: CallbackService,
    private readonly replyService: ReplyService,
    private readonly verify: VerifyWebhook,
    private readonly messageTemplate: MessageTemplate,
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
    // save callback
    await this.callbackService.create(body);

    // send awayMessage
    if (this.verify.isTextMessage(body)) {
      await this.replyService.sendTextMessage(
        body.entry[0].changes[0].value.messages[0].from,
        this.messageTemplate.awayMessage(
          body.entry[0]?.changes[0]?.value?.contacts[0].profile.name,
        ),
      );
    }

    // receivingImage
    if (this.verify.isImageMessage(body)) {
      await this.replyService.sendTextMessage(
        body.entry[0]?.changes[0]?.value?.messages[0]?.from,
        this.messageTemplate.receivingImage(
          body.entry[0].changes[0].value.contacts[0].profile.name,
        ),
      );
    }

    // receivingAudio
    if (this.verify.isAudioMessage(body)) {
      await this.replyService.sendAudioMessage(
        body.entry[0]?.changes[0]?.value?.messages[0]?.from,
      );
    }
    return Promise.resolve('ignore callback not saved');
  }
}
