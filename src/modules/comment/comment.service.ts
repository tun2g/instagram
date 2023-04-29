import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';
import { CreateCommentDto } from './dto/create-comment-dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectClient()
        private readonly pg:Client

    ){

    }    
    async maxId(): Promise<any>{
        try {
            
            const comments = await this.pg.query('SELECT * FROM comments');
            return comments.rows[comments.rows.length-1]?.commentid;
        } catch (error) {
            console.log(error)
        }       
}
    async create(data:CreateCommentDto){
        try {
            let newComment:Comment={...data,commentid:1}

            let maxId:number=await this.maxId()
            if (typeof (maxId)!== 'number' )
            {
                maxId=0
            }
            newComment.commentid=maxId+1

            await this.pg.query(
                'INSERT INTO comments (userid,postid,content,commentid)  VALUES ($1, $2,$3,$4) RETURNING *',
                [newComment.userid,newComment.postid,newComment.content,newComment.commentid]
             )
        } catch (error) {
            console.log(error)
        }
    }

    async update(comment:Comment){
        try {
            await this.pg.query(
                `UPDATE comments SET content= $1 WHERE commentid = $2;`,
                [comment.content,comment.commentid],
            );
        } catch (error) {
            console.log(error);
        }   
    }

    async getCommentsByPost(postid:number){
        try {
            const list = await this.pg.query(
                'SELECT comments.*,users.username,users.avatar FROM comments,users WHERE postid = $1 AND comments.userid=users.userid',[postid]
            )
            return list.rows
        } catch (error) {
            console.log(error)
        }
    }

    async delete(commentid:number){
        try {
            await this.pg.query(
                `DELETE FROM comments WHERE commentid=$1`,
                [commentid]
            )
        } catch (error) {
            console.log(error)
        }
    }
}
