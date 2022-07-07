import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { HobbyEntity } from './entities/hobby.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personsRepository: Repository<PersonEntity>,
    @InjectRepository(HobbyEntity)
    private readonly hobbyRepository: Repository<HobbyEntity>,
  ) {}

  find(paginationDto: PaginationDto) {
    return this.personsRepository.find({
      relations: { hobbies: true },
      skip: paginationDto.offset,
      take: paginationDto.limit,
    });
  }

  async findOne(id: number) {
    const person = await this.personsRepository.findOne({
      where: { id },
      relations: { hobbies: true },
    });
    if (!person) {
      throw new NotFoundException(`#${id} is not found`);
    }
    return person;
  }

  private async createHobby(name: string) {
    const hobby = await this.hobbyRepository.findOne({ where: { name } });
    if (hobby) return hobby;
    return this.hobbyRepository.create({ name });
  }

  async create(createPersonDto: CreatePersonDto) {
    const hobbies = await Promise.all(
      createPersonDto.hobbies.map(hobby => this.createHobby(hobby)),
    );
    const person = this.personsRepository.create({ ...createPersonDto, hobbies });
    return this.personsRepository.save(person);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const hobbies =
      updatePersonDto.hobbies &&
      (await Promise.all(updatePersonDto.hobbies.map(hobby => this.createHobby(hobby))));
    const person = await this.personsRepository.preload({ id, ...updatePersonDto, hobbies });
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
