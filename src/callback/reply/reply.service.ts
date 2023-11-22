import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { WhatsappResponse } from '../dto/wa-response';

@Injectable()
export class ReplyService {
  private readonly logger = new Logger(ReplyService.name);
  constructor(private readonly httpService: HttpService) {}

  sendSimpleText(): Observable<AxiosResponse<WhatsappResponse>> {
    return this.httpService.get('http://localhost:3000/cats');
  }
}
