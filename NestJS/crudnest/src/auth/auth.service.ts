import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/common/hash/hash.service';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterUserDto) {
    const hash = await this.hashService.hashPassword(registerDto.password);

    const { user, role } = await this.userService.createUser({
      ...registerDto,
      password: hash,
    });

    const payload = { sub: user.user_id, roleId: role.role_id };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  async loginUser(loginDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles =
      user.roles?.map((role) => ({
        roleId: role.role_id,
        roleName: role.name,
      })) || [];

    const payload = { sub: user.user_id, roles: roles };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
