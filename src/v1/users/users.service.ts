import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/mongodb';
import * as bcrypt from 'bcrypt';
import { User } from '@/entities';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    const user = new User(createUserDto.username, hash);
    user.roles.push('MEMBER');

    await this.em.persistAndFlush(user);
    return user;
  }

  findAll() {
    return this.em.findAll(User, { populate: ['histories'] });
  }

  findOne(id: string) {
    return this.em.findOneOrFail(User, { id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.em.findOneOrFail(User, { id });
    this.em.assign(user, updateUserDto);
    await this.em.flush();
    return await this.em.findOne(User, { id });
  }

  async remove(id: string) {
    const user = await this.em.findOneOrFail(User, { id });
    await this.em.removeAndFlush(user);
    return;
  }

  findOneByUsername(username: string) {
    return this.em.findOneOrFail(User, { username });
  }
}
