import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../auth/user.entity';

// Using this decorator makes the user ID accesible,
// HOW TO: write <@GetUser() user: User> inside your controller methods where needed

export const GetAuthor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
