import { IsString, IsStrongPassword, Length } from 'class-validator';

export class AuthRequestDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
