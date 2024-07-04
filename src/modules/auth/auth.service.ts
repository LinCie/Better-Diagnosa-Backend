import { CreateRequestContext, MikroORM } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly orm: MikroORM,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @CreateRequestContext()
  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUser(username);
    const passwordCorrect = await bcrypt.compare(password, user.hash);
    if (passwordCorrect) {
      return user;
    }
    return null;
  }

  @CreateRequestContext()
  async createUser(username: string, password: string) {
    await this.usersService.createUser(username, password);
    return null;
  }

  async login(user: { username: string; id: number }) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
