import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.entity';
import { User } from './User.entity';

@Entity()
export class History extends BaseEntity {
  @ManyToOne(() => User)
  user!: User;

  @Property()
  isDengue: boolean;

  @Property()
  timestamp: number = Date.now();

  constructor(isDengue: boolean) {
    super();
    this.isDengue = isDengue;
  }
}
