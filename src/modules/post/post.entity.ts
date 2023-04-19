import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  postid: number;

  @Column()
  userid: number;

  @Column()
  title: string;

  @Column()
  content: string;  
}