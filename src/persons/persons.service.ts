import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonEntity } from './entities/person.entity';

@Injectable()
export class PersonsService {
  private readonly persons: PersonEntity[] = [];

  find() {
    return this.persons;
  }

  findOne(id: string) {
    return this.persons.find(person => person.id === id);
  }

  create(createPersonDto: Omit<PersonEntity, 'id'>) {
    const person = { ...createPersonDto, id: this.persons.length.toString() };
    this.persons.push(person);
    return person;
  }

  update(id: string, updatePersonDto: Partial<Omit<PersonEntity, 'id'>>) {
    const person = this.findOne(id);
    if (!person) {
      throw new NotFoundException(`#${id} is not found`);
    }
    return Object.assign(person, updatePersonDto);
  }

  remove(id: string) {
    const index = this.persons.findIndex(person => person.id === id);
    if (index < 0) {
      throw new NotFoundException(`#${id} is not found`);
    }
    return this.persons.splice(index, 1);
  }
}
