import {
  Body,
  Controller,
  Get,
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
    return this.historyService.getHistory(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addHistory(
    @Request() req: RequestWithUser,
    @Body() body: { isDengue: boolean },
  ) {
    return this.historyService.addHistory(req.user, body.isDengue);
  }
}
