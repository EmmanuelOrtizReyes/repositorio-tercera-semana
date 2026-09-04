import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class RegisterDto {
  @IsString() @IsNotEmpty() @MinLength(2) @MaxLength(100)
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  name!: string;
  @IsEmail() @MaxLength(150)
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
  email!: string;
  @IsString() @MinLength(8) password!: string;
}
