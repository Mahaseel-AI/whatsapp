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

@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

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
    return 'callback saved';
  }
}
