import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  findAll(): Book[] {
    return this.books;
  }

  create(createBookDto: CreateBookDto): Book {
    const book: Book = { ...createBookDto };
    this.books.push(book);
    return book;
  }
}
