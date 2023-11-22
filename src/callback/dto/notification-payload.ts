interface MetadataObject {
  display_phone_number: string;
  phone_number_id: string;
}

interface ValueObject {
  messaging_product: string;
  metadata: MetadataObject;
}

interface ChangeObject {
  value: ValueObject;
}

interface EntryObject {
  id: string;
  changes: ChangeObject[];
}

export class NotificationPayloadDTO {
  object: string;
  entry: EntryObject[];
}
