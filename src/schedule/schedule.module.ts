import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from './entities/schedule.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Schedule',
        schema: ScheduleSchema,
      },
    ]),
    UsersModule
  ],
  exports: [ScheduleService],
  controllers: [ScheduleController],
  providers: [ScheduleService, JwtService],
})
export class ScheduleModule {}
