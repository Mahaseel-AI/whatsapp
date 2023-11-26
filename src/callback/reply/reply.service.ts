import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WhatsappResponse } from '../dto/wa-response';

@Injectable()
export class ReplyService {
  private readonly logger = new Logger(ReplyService.name);
  constructor(private readonly httpService: HttpService) {}

  async sendTextMessage(
    recipient_phone: string,
    text: string,
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
              body: text,
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
            throw error;
          }),
        ),
    );
    return data;
  }

  async sendAudioMessage(recipient_phone: string): Promise<WhatsappResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `https://graph.facebook.com/${process.env.META_VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipient_phone,
            type: 'audio',
            audio: {
              link: 'https://mahaseelservices.blob.core.windows.net/tridge-data/awayMessage.mp3',
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
            throw error;
          }),
        ),
    );
    return data;
  }
}
