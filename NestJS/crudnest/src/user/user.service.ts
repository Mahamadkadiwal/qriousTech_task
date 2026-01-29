import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { RolesService } from 'src/roles/roles.service';
import { User } from './models/user.model';
import { Role } from 'src/roles/models/roles.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly roleService: RolesService,
    // @InjectModel(Role)
    // private roleModel: typeof Role,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      const { username, email, password, roleName } = registerUserDto;
      const user = await this.userModel.create({
        username,
        email,
        password,
      });

      const role = await this.roleService.getRoleByName(roleName);

      await user.$add('roles', role);

      return { user, role };
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
      include: [
        {
          model: Role,
          attributes: ['role_id', 'name'],
          through: { attributes: [] },
        },
      ],
    });
  }

  // async assignRoleToUser(userId: number, roleId: number) {
  //   const user = await this.userModel.findByPk(userId);
  //   const role = await this.roleModel.findByPk(roleId);

  //   if (!user || !role) {
  //     throw new NotFoundException('User or Role not found');
  //   }

  //   await user.$add('roles', role);

  //   return { message: 'Role assigned successfully' };
  // }
}
