import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  title!: string;

  @IsString({ message: 'Description must be a string' })
  description!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  price!: number;
}
