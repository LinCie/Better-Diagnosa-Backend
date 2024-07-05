import { Entity, OneToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.entity';
import { History } from './History.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  username!: string;

  @Property()
  hash!: string;

  @Property()
  roles: string[] = [];

  @OneToOne(() => History, (history) => history.user, {
    owner: true,
    orphanRemoval: true,
  })
  history: History = new History();

  constructor(username: string, hash: string) {
    super();

    this.username = username;
    this.hash = hash;
  }
}
