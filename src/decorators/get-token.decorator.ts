import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthDto } from '../guards/dto/auth.dto';

// Using this decorator makes the user ID accesible,
// HOW TO: write <@GetUser() user: User> inside your controller methods where needed

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.token;
  },
);
