import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageTemplate {
  awayMessage(recipient_name: string): string {
    return `Hello ${recipient_name}! Thank you for reaching out. Our support team at Mahaseel AI is currently away, but we will be back to assist you shortly.`;
  }

  receivingImage(recipient_name): string {
    return `Thanks ${recipient_name}!we have received the image you submitted for analysis. Our team is currently working diligently on applying machine learning algorithms to analyze the content.The process may take some time, as we want to ensure a thorough and accurate analysis. We appreciate your patience and understanding as we work to extract meaningful insights from the data.`;
  }
}