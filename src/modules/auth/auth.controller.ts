import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser, loginRequest, signUpBody } from './auth.interface';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: loginRequest) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() body: signUpBody) {
    return this.authService.createUser(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req: RequestWithUser) {
    return this.authService.refresh(req.user);
  }
}
