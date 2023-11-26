import { Injectable } from '@nestjs/common';
import { NotificationPayloadDTO } from '../dto/notification-payload';

@Injectable()
abstract class Webhook {
  abstract isTextMessage(payload: NotificationPayloadDTO): boolean;
  abstract isImageMessage(payload: NotificationPayloadDTO): boolean;
  abstract isStickerMessage(payload: NotificationPayloadDTO): boolean;
  abstract isUnknownMessage(payload: NotificationPayloadDTO): boolean;
  abstract isAudioMessage(payload: NotificationPayloadDTO): boolean;
}

@Injectable()
export class VerifyWebhook extends Webhook {
  isTextMessage(payload: NotificationPayloadDTO): boolean {
    return payload[0]?.changes[0]?.value?.messages[0]?.type === 'text';
  }
  isImageMessage(payload: NotificationPayloadDTO): boolean {
    return payload[0]?.changes[0]?.value?.messages[0]?.type === 'image';
  }
  isStickerMessage(payload: NotificationPayloadDTO): boolean {
    return payload[0]?.changes[0]?.value?.messages[0]?.type === 'sticker';
  }
  isUnknownMessage(payload: NotificationPayloadDTO): boolean {
    return payload[0]?.changes[0]?.value?.messages[0]?.type === 'unknown';
  }
  isAudioMessage(payload: NotificationPayloadDTO): boolean {
    return payload[0]?.changes[0]?.value?.messages[0]?.type === 'audio';
  }
}
