import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private idCounter = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  create(book: CreateBookDto): Book {
    const newBook: Book = { id: this.idCounter++, ...book };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, data: UpdateBookDto): Book {
    const book = this.findOne(id);
    
    // Оновлюємо тільки ті поля, які передані
    if (data.title) book.title = data.title;
    if (data.description) book.description = data.description;
    if (data.price) book.price = data.price;
    
    return book;
  }

  remove(id: number) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException('Book not found');
    this.books.splice(index, 1);
    return { message: 'Deleted' };
  }
}
