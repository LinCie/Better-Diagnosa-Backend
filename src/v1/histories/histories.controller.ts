import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces';

@Controller('v1/histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createHistoryDto: CreateHistoryDto,
  ) {
    return this.historiesService.create(req.user, createHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.historiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(+id, updateHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiesService.remove(+id);
  }
}
