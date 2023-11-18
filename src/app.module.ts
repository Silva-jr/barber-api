import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECT } from './constants';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ScheduleModule,
    MongooseModule.forRoot(MONGO_CONNECT,{ autoCreate: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
