import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorator/auth.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { PermissionsGuard } from 'src/common/guards/permission.guard';
import { Permission } from 'src/common/decorator/permission.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    const token = await this.authService.registerUser(registerDto);
    return token;
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const token = await this.authService.loginUser(loginDto);
    return token;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Permission('users', 'get')
  @Get('users')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('user')
  @Permission('permission', 'add')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
