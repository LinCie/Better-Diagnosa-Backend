import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/auth.interface';
import { QuestionData } from './question.interface';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getQuestions() {
    return this.questionService.getQuestions();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createQuestion(
    @Request() req: RequestWithUser,
    @Body() body: QuestionData,
  ) {
    return this.questionService.createQuestion(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() body: QuestionData,
  ) {
    return this.questionService.updateQuestion(Number(id), req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteQuestion(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ) {
    return this.questionService.deleteQuestion(Number(id), req.user);
  }
}
