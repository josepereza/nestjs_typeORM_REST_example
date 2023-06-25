import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, MetadataAlreadyExistsError, Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

//npm i nestjs-typeorm-paginate
 
@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
      private authorRepository: Repository<Author>
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({ 
      select: { 
        id: true,
        name: true,
        books: {
          id: true,
          title: true,
        }
      },
      relations: ['books'] });
  }

  // Paginacja wyników 
  async findAllPaginate(options: IPaginationOptions): Promise<Pagination<Author>> {
    const queryBuilder = this.authorRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'ASC'); 
    return paginate<Author>(queryBuilder, options);
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
      const exists = await this.authorRepository.exist({ where: { name: createAuthorDto.name} });
      if(exists) throw new ConflictException('Author already exists!');
      return this.authorRepository.save(createAuthorDto);
  }

  async findOne(id: number): Promise<Author | null> {
    return await this.authorRepository.findOneByOrFail({id:+id});
  }

  // SELECT * FROM authors WHERE name LIKE %name%
  async findName(name: string): Promise<Author[] | null> {
    return this.authorRepository.find({ 
      relations: ['books'],
      where: { 
        name: ILike(`%${ name || ''}%`)
      }    
    },
    ); 
  }

  async update(id: number, data: Partial<UpdateAuthorDto>) {
    await this.authorRepository.update(id, data);
    return await this.authorRepository.findOneBy({id:id});
  }

  // delete with catch when foreign key error (author->book delete RESTRICT)
  async remove(id: number): Promise<void> {
    const exists = await this.authorRepository.exist({ where: { id:id} });
    if(!exists) throw new NotFoundException();
    try {
    await this.authorRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Cannot delete: foreign key constraint fails!');
    }
  }
}


