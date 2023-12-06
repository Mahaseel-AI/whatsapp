import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageTemplate {
  awayMessage(recipient_name: string): string {
    return `Hello ${recipient_name}! Thank you for reaching out. Our support team at Mahaseel AI is currently away, but we will be back to assist you shortly.`;
  }

  receivingImage(recipient_name): string {
    return `Hi ${recipient_name} at the moment, I'm in a situation where I'm unable to take a image and analyze 😓, would it be possible for us to continue our conversation through text instead? `;
  }
}
