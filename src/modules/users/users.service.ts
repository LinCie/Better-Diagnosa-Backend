import {
  CreateRequestContext,
  EntityManager,
  MikroORM,
} from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  @CreateRequestContext()
  async getUser(username: string) {
    return await this.em.findOne(User, { username: username });
  }

  @CreateRequestContext()
  async createUser(username: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = new User(username, hash);
    return await this.em.persistAndFlush(user);
  }
}
