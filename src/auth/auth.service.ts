import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRequestDto } from './dto/auth-request.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(authRequestDto: AuthRequestDto): Promise<void> {
    await this.usersRepository.save(authRequestDto);
  }

  async signin(username: string, password: string): Promise<AuthResponseDto> {
    const user = await this.usersRepository.findOneBy({ username });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const token = await this.jwtService.signAsync({
      _id: user.id,
      _username: user.username,
    });
    const response = new AuthResponseDto();
    response.id = user.id;
    response.username = user.username;
    response.token = token;
    return response;
  }
}
