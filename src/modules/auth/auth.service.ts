import { CreateRequestContext, MikroORM } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly orm: MikroORM,
    private readonly usersService: UsersService,
  ) {}

  @CreateRequestContext()
  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUser(username);
    const passwordCorrect = await bcrypt.compare(password, user.hash);
    if (passwordCorrect) {
      return { username: user.username, id: user.id };
    }
    return null;
  }
}
