import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  find(@Query() paginationDto: PaginationDto) {
    return this.personsService.find(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personsService.findOne(id);
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personsService.remove(id);
  }
}
