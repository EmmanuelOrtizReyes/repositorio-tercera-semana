import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @IsString() @IsNotEmpty() @MaxLength(120)
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  name!: string;

  @IsOptional() @IsString() @MaxLength(500)
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01)
  price!: number;

  @IsInt() @Min(0)
  stock!: number;

  @IsOptional() @IsString() @MaxLength(100)
  category?: string;
}
