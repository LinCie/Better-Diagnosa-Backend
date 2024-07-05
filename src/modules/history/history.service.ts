import { User } from '@/entities/User.entity';
import {
  CreateRequestContext,
  EntityManager,
  MikroORM,
} from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  @CreateRequestContext()
  async getHistory(user: User) {
    return user.history;
  }

  async addHistory(user: User, isDengue: boolean) {
    user.history.diagnosis.push({ isDengue, time: Date.now() });
    return user.history;
  }
}
