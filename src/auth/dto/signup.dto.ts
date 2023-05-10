import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Entrer une email correcte' })
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  readonly isEmailConfirmed: boolean

  @IsNotEmpty()
  @IsString()
  readonly contact: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
