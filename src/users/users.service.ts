import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: Partial<CreateUserDto>): Promise<User> {
    const newCourse = new this.userModel(createUserDto);
    await newCourse.save();
    return newCourse.toObject({ versionKey: false });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findbyID(id: string): Promise<User> {
    return this.userModel.findOne({_id: id});
  }

   findbyUsername(username: string): Promise<User> {
    return this.userModel.findOne({email: username});
  }


  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
