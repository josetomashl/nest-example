import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/signin-response.dto';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() authRequestDto: AuthRequestDto): Promise<void> {
    try {
      await this.authService.signup(authRequestDto);
    } catch (error) {
      throw new ConflictException('Username already exists');
    }
  }

  @Public()
  @Post('signin')
  async signin(
    @Body() authRequestDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    const { username, password } = authRequestDto;
    return this.authService.signin(username, password);
  }
}
