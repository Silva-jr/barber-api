import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'console';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: String;
  @Prop()
  email: String;
  @Prop()
  password: String;
  @Prop()
  isBarber: Boolean;
  @Prop()
  startTime?: string;
  @Prop()
  endTime?: string;
  @Prop()
  startDay?: string;
  @Prop()
  endDay?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
