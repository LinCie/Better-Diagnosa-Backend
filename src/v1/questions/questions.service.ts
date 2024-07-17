import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { EntityManager } from '@mikro-orm/mongodb';
import { Question } from '@/entities';

@Injectable()
export class QuestionsService {
  constructor(private readonly em: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = new Question(
      createQuestionDto.question,
      createQuestionDto.belief,
    );

    await this.em.persistAndFlush(question);

    return question;
  }

  findAll() {
    return this.em.findAll(Question);
  }

  findOne(id: string) {
    return this.em.findOneOrFail(Question, { id });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.em.findOneOrFail(Question, { id });
    this.em.assign(question, updateQuestionDto);
    this.em.flush();
    return this.em.findOne(Question, { id });
  }

  async remove(id: string) {
    const question = await this.em.findOneOrFail(Question, { id });
    await this.em.removeAndFlush(question);
    return;
  }
}
