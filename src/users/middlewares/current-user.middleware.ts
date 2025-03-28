import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { NextFunction, Request, Response } from 'express';
import { User as _User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      currentUser?: _User;
    }
  }
}

@Injectable()
export class currentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOneById(userId);

      req.currentUser = user;
    }

    return next();
  }
}
