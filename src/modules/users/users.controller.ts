import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/auth.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('username')
  async getUsername(@Request() req: RequestWithUser) {
    return this.usersService.getUsername(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userdata')
  async getUserData(@Request() req: RequestWithUser) {
    return this.usersService.getUserData(req.user);
  }
}
