import { History } from '@/entities/History.entity';
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
  async getHistories(user: User) {
    await user.histories.init();
    return user.histories;
  }

  @CreateRequestContext()
  async addHistory(user: User, isDengue: boolean) {
    const newHistory = new History(isDengue);
    this.em.persist(newHistory);
    user.histories.add(newHistory);
    await this.em.flush();
    return newHistory;
  }
}
