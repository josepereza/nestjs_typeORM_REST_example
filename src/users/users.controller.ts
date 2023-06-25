import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuth.guard';
import { LocalAuthGuard } from 'src/auth/guards/localAuth.guard';

@ApiTags('users')
//@UseGuards(LocalAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 @UseGuards(CookieAuthenticationGuard)
 @UseGuards(LocalAuthGuard)
 @Get('/') 
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get('/username/:username') 
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
