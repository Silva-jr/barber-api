import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({timestamps: true})
export class Schedule {
  @Prop()
  date: string;
  @Prop()
  time: string;
  @Prop()
  barber: User;
  @Prop()
  user: User
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
