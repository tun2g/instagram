import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Jwt {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  refreshtoken: string;

}