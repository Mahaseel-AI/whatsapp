import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CallbackDocument = Callback & Document;

@Schema()
export class Callback {
  @Prop({ required: true })
  object: string;

  @Prop({ required: true })
  entry: object[];
}

export const CallbackSchema = SchemaFactory.createForClass(Callback);
