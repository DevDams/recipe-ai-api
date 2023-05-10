import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignupDto): Promise<{ token: string, user: {} }> {
    return this.authService.signUp(signUpDto);
  }
  
  @Get('confirm/:token')
  confirmEmailAdress(@Param('token') token: string): Promise<any> {
    return this.authService.confirmEmail(token);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string, user: {} }> {
    return this.authService.login(loginDto);
  }
}
