import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContactDocument = Contact & Document;

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop({
    virtual: 'id',
    get: function () {
      return this._id;
    },
  })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true, ref: 'User' })
  userId: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
