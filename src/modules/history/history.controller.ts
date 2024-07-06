import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/auth.interface';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHistory(@Request() req: RequestWithUser) {
    return this.historyService.getHistories(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addHistory(
    @Request() req: RequestWithUser,
    @Body() body: { isDengue: boolean },
  ) {
    return this.historyService.addHistory(req.user, body.isDengue);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteHistory(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    return this.historyService.deleteHistory(Number(id), req.user);
  }
}
