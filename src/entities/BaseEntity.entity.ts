import { PrimaryKey } from '@mikro-orm/core';

export class BaseEntity {
  @PrimaryKey({ autoincrement: true })
  id: number;
}
