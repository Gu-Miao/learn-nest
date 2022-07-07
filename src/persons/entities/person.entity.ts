import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('persons')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly age: number;

  @Column()
  readonly gender: 0 | 1;

  @Column('json', { nullable: true })
  readonly hobbies: string[];
}
