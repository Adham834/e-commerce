import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { signUpDto } from './dtos/sign-up.dto';
import { User } from '@prisma/client';
import { currentUser } from './decorators/current-user.decorator';

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
  async signIn(@Body() body: signUpDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    try {
      session.userId = user.id;
    } catch (err) {
      throw new ForbiddenException();
    }

    return user;
  }

  @Get('/get-me')
  whoAmI(@currentUser() user: User) {
    return user;
  }

  @Get('/')
  getAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('/get-user/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOneById(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<User>) {
    return await this.usersService.updateUser(parseInt(id), { name: 'Adham' });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const { email, ...user } = await this.usersService.findOneById(
      parseInt(id),
    );

    return this.usersService.deleteUser(email);
  }
}
