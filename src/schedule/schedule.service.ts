import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
    private userService: UsersService,
  ) {}

  async create(createScheduleDto: Schedule): Promise<Schedule> {
    const newSchedule = new this.scheduleModel(createScheduleDto);    
    await newSchedule.save();
    return newSchedule.toObject({ versionKey: false });
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
