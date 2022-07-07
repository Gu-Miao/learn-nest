import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/events/entities/event.entity';
import { HobbyEntity } from './entities/hobby.entity';
import { PersonEntity } from './entities/person.entity';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity, HobbyEntity, EventEntity])],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
