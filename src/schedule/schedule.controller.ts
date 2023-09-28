import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { AuthsGuard } from 'src/auth/guards/auth.guard';
import { Schedule } from './entities/schedule.entity';
import { UsersService } from 'src/users/users.service';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthsGuard)
  @Post()
  async create(@Body() createScheduleDto: Schedule, @Request() req): Promise<Schedule> {
    const barber = await this.userService.findbyID(createScheduleDto.barber);
    if (!barber) {
      throw new HttpException('Barbeiro nao encontrado', HttpStatus.FORBIDDEN);
    }
    console.log('Salvando a marcacao...');
    createScheduleDto.barber = barber;
    createScheduleDto.user = req.user;
    console.log(createScheduleDto);
    return this.scheduleService.create(createScheduleDto);
  }

  @UseGuards(AuthsGuard)
  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @UseGuards(AuthsGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    console.log('apagando...');
    return this.scheduleService.remove(+id);
  }
}
