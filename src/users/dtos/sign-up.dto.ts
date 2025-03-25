import { IsEmail, IsString } from 'class-validator';

export class signUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
