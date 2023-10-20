import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Using this decorator makes the user ID accesible,
// HOW TO: write <@UserID() userid: string> inside your controller methods where needed

export const UserID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user._id;
  },
);
