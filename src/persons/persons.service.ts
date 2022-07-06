import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personsRepository: Repository<PersonEntity>,
  ) {}

  find() {
    return this.personsRepository.find();
  }

  async findOne(id: number) {
    const person = await this.personsRepository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException(`#${id} is not found`);
    }
    return person;
  }

  create(createPersonDto: CreatePersonDto) {
    const person = this.personsRepository.create(createPersonDto);
    return this.personsRepository.save(person);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personsRepository.preload({ id, ...updatePersonDto });
    if (!person) {
      throw new NotFoundException(`#${id} is not found`);
    }
    return this.personsRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.findOne(id);
    return this.personsRepository.remove(person);
  }
}
