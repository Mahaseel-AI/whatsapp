import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { WhatsappResponse } from '../dto/wa-response';

@Injectable()
export class ReplyService {
  private readonly logger = new Logger(ReplyService.name);
  constructor(private readonly httpService: HttpService) {}

  sendSimpleAwayMessage(
    recipient: string,
  ): Observable<AxiosResponse<WhatsappResponse>> {
    this.logger.log('Sending message to ' + recipient);
    return this.httpService.post(
      `https://graph.facebook.com/${process.env.META_VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipient,
        type: 'text',
        text: {
          preview_url: false,
          body: 'Hello! Thank you for reaching out. Our support team is currently away, but we will be back to assist you shortly.',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        },
      },
    );
  }
}
