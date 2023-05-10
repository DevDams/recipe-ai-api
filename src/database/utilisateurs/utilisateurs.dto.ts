import { Optional } from '@nestjs/common';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UtilisateursDto {
  readonly name: string;

  readonly email: string;

  readonly isEmailConfirmed: boolean

  readonly contact: string;

  readonly password: string;
}
