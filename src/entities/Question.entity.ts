import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.entity';

@Entity()
export class Question extends BaseEntity {
  @Property()
  question: string;

  @Property()
  belief: number;

  constructor(question: string, belief: number) {
    super();

    this.question = question;
    this.belief = belief;
  }
}
