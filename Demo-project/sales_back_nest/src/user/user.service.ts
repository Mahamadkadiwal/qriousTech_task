import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(registerDto: RegisterUserDto) {
    try {
      const user = await this.userModel.create(registerDto);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      email: email,
    });
  }

  async findUserbyId(id: string) {
    return this.userModel.findById(id);
  }

  async updateUserPassword(id: string, password: string) {
    return await this.userModel.findByIdAndUpdate(
      id,
      { password: password },
      { new: true },
    );
  }
}
