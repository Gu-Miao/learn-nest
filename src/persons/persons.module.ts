import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
