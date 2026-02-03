import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { HashService } from 'src/common/hash/hash.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  async registerUser(registerDto: RegisterUserDto) {
    const hash = await this.hashService.hashPassword(registerDto.password);

    const user = await this.userService.createUser({
      ...registerDto,
      password: hash,
    });

    const payload = { sub: user._id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      userId: user._id,
      username: user.username,
      role: user.role,
    };
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

    const payload = { sub: user._id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      userId: user._id,
      username: user.username,
      role: user.role,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    try {
      const token = await this.jwtService.signAsync({ userid: user._id });

      const resetLink = `http://localhost:3000/reset-password?token=${token}`;
      await this.mailService.sendMail({
        to: email,
        subject: 'Password Reset Request',
        html: `
                <h3>Dear User,</h3>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
                `,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Problem in mailsender or generate token.',
      );
    }

    return {
      success: true,
      message: 'Reset link sent Check your email',
    };
  }

  async resetPassword(token: string, newPassword: string) {
    console.log(newPassword);
    try {
      const decode = await this.jwtService.verify(token);

      const user = await this.userService.findUserbyId(decode?.userid);
      if (!user) {
        throw new UnauthorizedException('User not exits');
      }

      const hashedPassword = await this.hashService.hashPassword(newPassword);

      const updatedUser = await this.userService.updateUserPassword(
        decode.userid,
        hashedPassword,
      );

      if (!updatedUser) {
        throw new UnauthorizedException('User Not update');
      }

      return {
        success: true,
        message: 'Password update successfully',
        user: updatedUser,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('problem in rest password');
    }
  }
}
