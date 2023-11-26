import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true, unique: true })
  wa_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 10 })
  credit: number;

  @Prop()
  messages: [];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
