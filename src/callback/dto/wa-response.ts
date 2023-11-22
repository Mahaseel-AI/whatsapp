interface ContactObject {
  input: string;
  wa_id: string;
}
interface MessageObject {
  id: string;
  message_status: 'accepted' | 'held_for_quality_assessment';
}

export class WhatsappResponse {
  messaging_product: 'whatsapp';
  contacts: ContactObject[];
  messages: MessageObject[];
}
