import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: String;
  @Prop()
  email: String;
  @Prop()
  password: String;
  @Prop()
  isBarber: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);