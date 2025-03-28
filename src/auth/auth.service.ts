import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

const saltedRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  signup(email, password) {
    const salt = bcrypt.genSaltSync(saltedRounds);
    const hash = bcrypt.hashSync(password, salt);

    return this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
  }

  async signin(email, password) {
    const [user] = await this.prisma.user.findMany({ where: { email } });

    if (!user) {
      throw new NotFoundException('Wrong Email!');
    }

    const salt = bcrypt.genSaltSync(saltedRounds);
    const hash = bcrypt.hashSync(password, salt);

    if (!bcrypt.compareSync(password, hash)) {
      throw new NotFoundException('Wrong Password!');
    }

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
