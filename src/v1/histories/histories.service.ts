import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History, User } from '@/entities';
import { EntityManager } from '@mikro-orm/mongodb';

@Injectable()
export class HistoriesService {
  constructor(private readonly em: EntityManager) {}

  async create(user: User, createHistoryDto: CreateHistoryDto) {
    const history = new History(createHistoryDto.isDengue);
    user.histories.add(history);
    await this.em.persistAndFlush(history);
    return history;
  }

  findAll() {
    return this.em.findAll(History);
  }

  findOne(id: string) {
    return this.em.findOneOrFail(History, { id });
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.em.findOneOrFail(History, { id });
    this.em.assign(history, updateHistoryDto);
  }

  async remove(id: string) {
    const history = await this.em.findOneOrFail(History, { id });
    await this.em.removeAndFlush(history);
    return;
  }
}
