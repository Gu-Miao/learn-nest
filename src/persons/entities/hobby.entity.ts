import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity('hobbies')
export class HobbyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PersonEntity, person => person.hobbies)
  persons: PersonEntity[];
}
