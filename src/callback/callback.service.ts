import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CallbackService {
  private readonly logger = new Logger(CallbackService.name);

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
}
