import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
<<<<<<< HEAD
  @IsString({ message: 'Author must be a string' })
  author?: string;

  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @IsOptional()
=======
>>>>>>> 51097eff79b97f85eceec75cbc29f6534d4e557b
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;
<<<<<<< HEAD

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;
=======
>>>>>>> 51097eff79b97f85eceec75cbc29f6534d4e557b
}
