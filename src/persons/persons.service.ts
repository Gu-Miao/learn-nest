import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonEntity } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  private readonly persons: PersonEntity[] = [];

  find() {
    return this.persons;
  }

  findOne(id: number) {
    return this.persons.find(person => person.id === id);
  }

  create(createPersonDto: CreatePersonDto) {
    const person = { ...createPersonDto, id: this.persons.length };
    this.persons.push(person);
    return person;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = this.findOne(id);
    if (!person) {
      throw new NotFoundException(`#${id} is not found`);
    }
    return Object.assign(person, updatePersonDto);
  }

  remove(id: number) {
    const index = this.persons.findIndex(person => person.id === id);
    if (index < 0) {
      throw new NotFoundException(`#${id} is not found`);
    }
    return this.persons.splice(index, 1);
  }
}
