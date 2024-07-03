import {
  CreateRequestContext,
  EntityManager,
  MikroORM,
} from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';

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
}
