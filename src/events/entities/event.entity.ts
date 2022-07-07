import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
@Index(['name', 'type'])
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('json')
  payload: Record<string, any>;
}
