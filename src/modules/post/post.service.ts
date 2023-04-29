import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { Posts } from './post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectClient()
        private readonly pg:Client

    ){

    }

    async getAllPosts(){
        try {
            const list =await this.pg.query(
                'SELECT posts.*,users.username,users.avatar FROM posts,users WHERE users.userid = posts.userid'
            )
            return list.rows
        } catch (error) {
            console.log(error)
        }
    }

    async maxId(): Promise<any>{
            try {
                
                const posts = await this.pg.query('SELECT * FROM posts');
                return posts.rows[posts.rows.length-1]?.postid;
            } catch (error) {
                console.log(error)
            }       
    }

    async create(data:CreatePostDto){
       try {

        const newPost:Posts= {...data,postid:1}
        let maxId:number=await this.maxId()
        if (typeof (maxId)!== 'number' )
        {
            maxId=0
        }
        newPost.postid=maxId+1

         await this.pg.query(
            'INSERT INTO posts (userid,postid,description,imageurl)  VALUES ($1, $2,$3,$4) RETURNING *',
            [newPost.userid,newPost.postid,newPost.description,newPost.imageurl]
         )
         
       } catch (error) {
         console.log(error)
       } 
    }

    async update(data:Posts){
        try {
            await this.pg.query(
                `UPDATE posts SET description = $1,imageurl= $2 WHERE postid = $3;`,
                [data.description, data.imageurl,data.postid],
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getPostsByUser(userid:number){
        try {
            const list =await this.pg.query(
                'SELECT * FROM posts WHERE userid = $1',[userid]
            )
            return list.rows
        } catch (error) {
            console.log(error)
        }
    }

    async delete(postid:number){
        try {
            await this.pg.query(
                `DELETE FROM posts WHERE postid=$1`,
                [postid]
            )
        } catch (error) {
            console.log(error)
        }
    }
}
