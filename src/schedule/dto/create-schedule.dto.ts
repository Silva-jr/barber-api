import { User } from "src/users/entities/user.entity";

export class CreateScheduleDto {       
    readonly date: string;
    readonly time: string;
    readonly barber: User;   
}
