import { Question } from '@/entities/Question.entity';
import { User } from '@/entities/User.entity';
import {
  CreateRequestContext,
  EntityManager,
  MikroORM,
} from '@mikro-orm/sqlite';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { QuestionData } from './question.interface';

@Injectable()
export class QuestionService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  @CreateRequestContext()
  async createQuestion(user: User, data: QuestionData) {
    if (!user.roles.includes('ADMIN')) {
      throw new UnauthorizedException('admin only route');
    }

    try {
      if (!data.question || !data.belief) {
        throw new BadRequestException();
      }

      const question = new Question(data.question, Number(data.belief));
      await this.em.persistAndFlush(question);

      return question;
    } catch (error) {
      throw error;
    }
  }

  @CreateRequestContext()
  async updateQuestion(id: number, user: User, data: QuestionData) {
    if (!user.roles.includes('ADMIN')) {
      throw new UnauthorizedException('admin only route');
    }

    try {
      const question = await this.em.findOne(Question, { id });
      if (!question) {
        throw new BadRequestException('Question does not exist');
      }

      await this.em.assign(question, data);
      await this.em.flush();

      return;
    } catch (error) {
      throw error;
    }
  }

  @CreateRequestContext()
  async deleteQuestion(id: number, user: User) {
    if (!user.roles.includes('ADMIN')) {
      throw new UnauthorizedException('admin only route');
    }
    try {
      const question = await this.em.findOne(Question, { id });
      await this.em.removeAndFlush(question);
      return;
    } catch (error) {
      throw error;
    }
  }
}
