import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'coins' })
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  network: string;

  @Column()
  image: string;

  @Column('bigint')
  minimum: number;

  @Column('bigint')
  maximum: number;
}
