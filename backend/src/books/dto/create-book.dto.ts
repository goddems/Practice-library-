import { Type } from 'class-transformer';
<<<<<<< HEAD
import { IsString, IsNumber, IsOptional } from 'class-validator';
=======
import { IsString, IsNumber } from 'class-validator';
>>>>>>> 51097eff79b97f85eceec75cbc29f6534d4e557b

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  title!: string;

<<<<<<< HEAD
  @IsString({ message: 'Author must be a string' })
  author!: string;

  @IsString({ message: 'Category must be a string' })
  category!: string;

=======
>>>>>>> 51097eff79b97f85eceec75cbc29f6534d4e557b
  @IsString({ message: 'Description must be a string' })
  description!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  price!: number;
<<<<<<< HEAD

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;
=======
>>>>>>> 51097eff79b97f85eceec75cbc29f6534d4e557b
}
