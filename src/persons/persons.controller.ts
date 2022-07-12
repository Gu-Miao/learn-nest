import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Public } from 'src/common/decorartors/public.decorator';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import { Protocol } from 'src/common/decorartors/protocol.decorator';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Public()
  @Get()
  async find(@Protocol() protocol: string, @Query() paginationDto: PaginationDto) {
    console.log('protocol: ', protocol);
    await new Promise(res => setTimeout(res, 5000));
    return this.personsService.find(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
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
