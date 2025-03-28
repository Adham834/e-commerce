import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { currentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(currentUserMiddleware).forRoutes('*');
  }
}
