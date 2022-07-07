import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HobbyEntity } from './hobby.entity';

@Entity('persons')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: 0 | 1;

  @Column({ default: 0 })
  messages: number;

  @JoinTable()
  @ManyToMany(() => HobbyEntity, hobby => hobby.persons, { cascade: true })
  readonly hobbies: HobbyEntity[];
}
