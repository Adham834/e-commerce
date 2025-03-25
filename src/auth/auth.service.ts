import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signup(email, password) {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async signin(email, password) {
    const [user] = await this.prisma.user.findMany({ where: { email } });

    if (!user) {
      return new NotFoundException('Wrong Email!');
    }

    if (password !== user.password) {
      return new NotFoundException('Wrong Password!');
    }

    return user;
  }
}
