import { Controller, Request, Post, UseGuards, Get, Req, HttpCode, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';
import { CookieAuthenticationGuard } from './auth/guards/cookieAuth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  authService: any;
  constructor(private readonly appService: AppService) {}

@UseGuards(LocalAuthGuard)
@Post('login')
async login(@Request() req): Promise<any> {
  return { user: { 
    id: req.user.id, 
    username: req.user.username, 
    msg: "Logged in!" 
  }};
}

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Req() req: any) {
    return { user: { 
      id: req.user.id, 
      username: req.user.username, 
      msg: "Logged" 
    }};
 }

@Get('/logout')
logout(@Request() req): any {
  req.session.destroy();
    return { msg: 'Youe are logged out!' }
}

}
