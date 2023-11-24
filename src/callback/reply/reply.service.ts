import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WhatsappResponse } from '../dto/wa-response';

@Injectable()
export class ReplyService {
  private readonly logger = new Logger(ReplyService.name);
  constructor(private readonly httpService: HttpService) {}

  async sendSimpleAwayMessage(
    recipient_phone: string,
    recipient_name: string,
  ): Promise<WhatsappResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `https://graph.facebook.com/${process.env.META_VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipient_phone,
            type: 'text',
            text: {
              preview_url: false,
              body: `Hello ${recipient_name}! Thank you for reaching out. Our support team is currently away, but we will be back to assist you shortly.`,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
