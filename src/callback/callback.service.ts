import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CallbackService {
  private readonly logger = new Logger(CallbackService.name);
}
