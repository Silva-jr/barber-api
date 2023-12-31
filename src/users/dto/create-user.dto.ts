import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  isBarber: boolean=false;

  startTime?: string;

  endTime?: string;

  startDay?: string;

  endDay?: string;
}
