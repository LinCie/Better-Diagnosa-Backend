import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RequestWithUser } from './interfaces';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
    );
    response.cookie('user', JSON.stringify(req.user));
    return { access_token, refresh_token };
  }

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token, user } =
      await this.authService.signUp(createUserDto);
    response.cookie('user', JSON.stringify(user));
    return { access_token, refresh_token };
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Request() req: RequestWithUser) {
    return this.authService.refresh(req.user);
  }
}
