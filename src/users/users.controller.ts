import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.usersService.hashPassword(
      user.password,
      salt,
    );
    user.password = hashedPassword;
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findbyID(id);
  }

  @Get('name/:name')
  findByUsername(@Param('name') name: string) {
    return this.usersService.findbyUsername(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.usersService.remove(+id);';
  }
}
