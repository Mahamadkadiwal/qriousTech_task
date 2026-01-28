import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './user.model';
import { UniqueConstraintError } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      const user = await this.userModel.create(registerUserDto);
      return user;
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }

  async fetchAll() {
    return this.userModel.findAll();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      where: { email },
    });
  }
}
