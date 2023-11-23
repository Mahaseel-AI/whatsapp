import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Callback, CallbackDocument } from './schemas/callback.schema';
import { Model } from 'mongoose';
import { NotificationPayloadDTO } from './dto/notification-payload';

@Injectable()
export class CallbackService {
  private readonly logger = new Logger(CallbackService.name);
  constructor(
    @InjectModel(Callback.name) private callbackModel: Model<CallbackDocument>,
  ) {}

  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  verifyToken(mode, token): boolean {
    this.logger.log('mode', mode);
    this.logger.log('token', token);
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      return true;
    }
    return false;
  }

  async create(
    notificationPayloadDTO: NotificationPayloadDTO,
  ): Promise<CallbackDocument> {
    const createdCallback = new this.callbackModel(notificationPayloadDTO);
    return createdCallback.save();
  }
}
