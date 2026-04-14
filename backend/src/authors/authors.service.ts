import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];
  private idCounter = 1;

  create(createAuthorDto: CreateAuthorDto): Author {
    const author: Author = {
      id: this.idCounter++,
      ...createAuthorDto,
    };
    this.authors.push(author);
    return author;
  }

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    const author = this.authors.find(item => item.id === id);
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): Author {
    const author = this.findOne(id);
    Object.assign(author, updateAuthorDto);
    return author;
  }

  remove(id: number) {
    const index = this.authors.findIndex(item => item.id === id);
    if (index === -1) throw new NotFoundException('Author not found');
    this.authors.splice(index, 1);
    return { message: 'Deleted' };
  }
}
