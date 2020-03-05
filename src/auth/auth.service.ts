
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(user: any) {
    const userRespone = await this.usersService.find(user.email);
    if (userRespone) {
      const isPasswordValid = await bcrypt.compare(user.password, userRespone.password);
      if (isPasswordValid) {
        const payload = { email: userRespone.email, name: userRespone.name };
        return {
          accessToken: this.jwtService.sign(payload),
          email: userRespone.email,
          name: userRespone.name
        };
      }
      return false;
    }
  }
}
