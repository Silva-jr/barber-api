import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from "mongoose";
export class CreateScheduleDto {
  @ApiProperty()
  date: string;
  @ApiProperty()
  time: string;
  @ApiProperty()
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  };;
}