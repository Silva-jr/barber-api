import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  @UseGuards()
  @Post('/login')
  async login(@Body() authDto: AuthDto) {    
    return this.authService.login(authDto);
  }
}
