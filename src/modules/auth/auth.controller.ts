import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { loginRequest, signUpBody } from './auth.interface';

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
}
