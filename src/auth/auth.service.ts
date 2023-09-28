import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JWT_SECRET } from 'src/constants';
import { User } from 'src/users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findbyEmail(username);
    if (!user) {
      console.log('user não encontrado');
      throw new NotAcceptableException('user não encontrado');
    }
    const passwordValid = await bcrypt.compare(password, user?.password);
    if (!passwordValid) {
      console.log('password errada');
      throw new NotAcceptableException('password errada');
    }
    if (user && passwordValid) {
      console.log(user);
      return user;
    }
    return null;
  }

  async login(authDto: AuthDto) {
    const user = this.validateUser(authDto?.email, authDto?.password);
    const payload = {
      username: (await user)?.username,
      email: (await user)?.email,
      _id: (await user)?._id,
    };

    console.log(payload);
   const access_token: string = await this.jwtService.signAsync({payload},{secret: JWT_SECRET} )
    return {access_token};
  }
}
