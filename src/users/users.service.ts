import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: Partial<CreateUserDto>): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    console.log('service',newUser)
    await newUser.save();
    return newUser.toObject({ versionKey: false });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findAllHairdress(): Promise<User[]> {
    return (await this.userModel.find()).filter(
      (user) => user.isBarber === true,
    );
  }

  findbyID(id: any): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async findbyEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

   async findbyUseLogged(id: any): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async remove(id: string) {
    const user = this.userModel.findOne({ _id: id });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.FORBIDDEN);
    }
    return this.userModel.deleteOne({ _id: id });
  }

  async update(id: string, updateDTO: Partial<User>): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    Object.assign(user, updateDTO);
    const updateUser = new this.userModel(user);
    return updateUser.save();
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
