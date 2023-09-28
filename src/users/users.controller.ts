import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthsGuard } from 'src/auth/guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@UseGuards(AuthsGuard)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    const email = await this.usersService.findbyEmail(user.email);
    if (email) {
      throw new HttpException(
        'Já existe um user com esse e-mail',
        HttpStatus.FORBIDDEN,
      );
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.usersService.hashPassword(
      user.password,
      salt,
    );
    user.password = hashedPassword;
    console.log('controler', user);
    return this.usersService.create(user);
  }

  @UseGuards(AuthsGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthsGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findbyID(id);
  }

  @UseGuards(AuthsGuard)
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findbyEmail(email);
  }

  @UseGuards(AuthsGuard)
  @Get('user/logado')
  findByLogged(@Request() req) {
    return this.usersService.findbyUseLogged(req.user.payload._id);
  }

  @Get('user/barbers')
  findAllHairdress(): Promise<User[]> {
    return this.usersService.findAllHairdress();
  }

  @UseGuards(AuthsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }
}
