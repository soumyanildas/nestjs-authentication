import { Controller, Request, Get, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Request() req, @Res() res: any) {
    const response = await this.authService.login(req.body);
    console.log('AuthController -> login -> response', response);
    if (response) {
      return res.status(HttpStatus.OK).json({
        error: false,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      error: true,
      message: 'Password mismatch'
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.body;
  }

}