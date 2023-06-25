import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Book } from './entities/book.entity';
import { ApiTags } from '@nestjs/swagger';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuth.guard';

@UseGuards(CookieAuthenticationGuard)
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //@UseGuards(LocalAuthGuard)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // http://localhost:3000/authors/paginate
  // http://localhost:3000/authors/paginate?limit=1
  // http://localhost:3000/authors/paginate?page=2&limit=2
  @Get('/paginate')
  async findAllPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Book>> {
    limit = limit > 100 ? 100 : limit;
    return this.booksService.findAllPaginate({
      page,
      limit,
      route: '/autors'
    });
  }

  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Get('find/:title')
  findByName(@Param('title') title: string) {
    return this.booksService.findTitle(title);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    console.log(createBookDto);
   return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateBookDto) {
    return this.booksService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
