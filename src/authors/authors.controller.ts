import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  // http://localhost:3000/authors/paginate
  // http://localhost:3000/authors/paginate?limit=1
  // http://localhost:3000/authors/paginate?page=2&limit=2
  @Get('/paginate')
  async findAllPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Author>> {
    limit = limit > 100 ? 100 : limit;
    return this.authorsService.findAllPaginate({
      page,
      limit,
      route: '/autors'
    });
  }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
   return this.authorsService.create(createAuthorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Get('find/:name')
  findByName(@Param('name') name: string) {
    return this.authorsService.findName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
