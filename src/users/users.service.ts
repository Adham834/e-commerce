import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    const [user] = await this.prisma.user.findMany({ where: { email } });

    if (!user) {
      throw new NotFoundException('No Such User!');
    }

    return user;
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('No Such id!!');
    }

    return user;
  }

  async findMany(name: string) {
    const users = await this.prisma.user.findMany({ where: { name } });

    if (!users.length) {
      throw new NotFoundException('Write a real name pfff haha!');
    }
    return users;
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async updateUser(id: number, { name }: Partial<User>) {
    return await this.prisma.user.update({ where: { id }, data: { name } });
  }

  async deleteUser(email: string) {
    return this.prisma.user.delete({ where: { email } });
  }
}
