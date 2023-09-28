import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export class User {
  _id?: mongoose.Schema.Types.ObjectId;
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  isBarber: boolean;
  @Prop()
  startTime?: string;
  @Prop()
  endTime?: string;
  @Prop()
  startDay?: string;
  @Prop()
  endDay?: string;
}
