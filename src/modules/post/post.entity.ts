import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postid: number;

  @Column()
  userid: string;

  @Column()
  title: string;

  @Column()
  content: string;
  
  

}