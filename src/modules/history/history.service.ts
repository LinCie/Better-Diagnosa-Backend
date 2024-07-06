import { History } from '@/entities/History.entity';
import { User } from '@/entities/User.entity';
import {
  CreateRequestContext,
  EntityManager,
  MikroORM,
} from '@mikro-orm/sqlite';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

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

  @CreateRequestContext()
  async deleteHistory(id: number, user: User) {
    const history = await this.em.findOne(History, { id });
    if (!history) {
      throw new NotFoundException();
    }

    if (history.user !== user) {
      throw new UnauthorizedException();
    }

    user.histories.remove(history);
    await this.em.flush();
    return;
  }
}
