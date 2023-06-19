import { User } from 'src/users/entities/user.entity';

export class Schedule {
  _id: string;
  date: string;
  time: string;
  barber: User;
}
