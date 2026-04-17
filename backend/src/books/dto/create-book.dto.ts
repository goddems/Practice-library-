import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  title!: string;

  @IsString({ message: 'Author must be a string' })
  author!: string;

  @IsString({ message: 'Category must be a string' })
  category!: string;

  @IsString({ message: 'Description must be a string' })
  description!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  price!: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;
}
