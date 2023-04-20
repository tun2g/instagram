import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Like {
  @Column()
  postid: number;

  @Column()
  userid: number;

}