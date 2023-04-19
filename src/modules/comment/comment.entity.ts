import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentid: number;

  @Column()
  userid: number;

  @Column()
  postid: number;

  @Column()
  content: string;  
}