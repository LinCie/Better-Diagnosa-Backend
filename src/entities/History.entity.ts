import { Entity, Property, OneToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.entity';
import { User } from './User.entity';

@Entity()
export class History extends BaseEntity {
  @OneToOne(() => User, (user) => user.history)
  user!: User;

  @Property()
  diagnosis!: { isDengue: boolean; time: number }[];

  constructor() {
    super();
  }

  addDiagnosis(isDengue: boolean): void {
    this.diagnosis.push({ isDengue: isDengue, time: Date.now() });
  }
}
