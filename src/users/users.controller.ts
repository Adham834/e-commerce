import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { signUpDto } from './dtos/sign-up.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() body: signUpDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Get('/signin')
  signIn(@Body() body: signUpDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Patch('/update-user')
  updateUser() {}

  @Delete()
  deleteUser() {}
}
