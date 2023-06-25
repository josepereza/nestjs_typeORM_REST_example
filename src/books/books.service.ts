import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable() 
export class BooksService {
    constructor(
      @InjectRepository(Book)
       private bookRepository: Repository<Book>
    ) {}

  // find() method example: queryBuilder example: how to use find and add relation author.
  // Result: selected fields from books table with author 
  // LEFT JOIN book.authorId = author.id WHERE active = true)
  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({ 
      select: { 
        id: true,
        title: true,
        author: {
          id: true,
          name: true,
        }
      },
      where: { active: true },
      relations: ['author'] });
  }

  // queryBuilder example: how to use QueryBuilder and Pagination.
  // Result: books pagination with LEFT JOIN book.authorId = author.id WHERE active = true
  // orderBy title ASC
  async findAllPaginate(options: IPaginationOptions): Promise<Pagination<Book>> {
    const queryBuilder = this.bookRepository
    .createQueryBuilder('book')
    .select(['book.id', 'book.title', 'author.name'])
    .orderBy('book.title', 'ASC')
    .leftJoin('book.author', 'author')
    .where('book.active = :active', { active: true });
    return paginate<Book>(queryBuilder, options);
  }

  // http://localhost:3000/books/1
  // Select only selected firleds from books and author
  async findOne(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneOrFail({
      where:{ id: +id},
      select: {
        id: true,
        title: true,
        author: {
          id: true,
          name: true,
        }
      },
      relations: ['author'],
    });
  }

    // SELECT book.id, book.title, author.name FROM books WHERE title LIKE %title% JOIN
    async findTitle(title: string): Promise<Book[] | null> {
      return this.bookRepository.find({ 
        select: { 
          id: true,
          title: true,
          author: {
            id: true,
            name: true,
          }
        },
        relations: ['author'],
        where: { 
          title: ILike(`%${ title || ''}%`)
        }    
      },
      ); 
    }

  // Example POST request to add book
  // POST JSON: { "title":"New title",	"author": { "name": "John Doe" } } <- new author
  // POST JSON: { "title":"New title",	"author": "1" <- id of existing author.id
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const exists = await this.bookRepository.exist({ where: { title: createBookDto.title} });
    if(exists) throw new ConflictException('Book already exists!');
    return await this.bookRepository.save(createBookDto);
  }

  // JSON PATCH {"author": "1" } or { "title": "New Title", "author": "1" }
  async update(id: number, data: Partial<UpdateBookDto>) {
    await this.bookRepository.update(id, data);
    return await this.bookRepository.findOneOrFail({
      where:{ id: +id},
      select: {
        id: true,
        title: true,
        author: {
          id: true,
          name: true,
        }
      },
      relations: ['author'],
    });
  }

  async remove(id: number): Promise<void> {
    const exists = await this.bookRepository.exist({ where: { id:id} });
    if(!exists) throw new NotFoundException();
    await this.bookRepository.delete(id);
  }
  
}
