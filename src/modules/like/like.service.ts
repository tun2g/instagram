import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

@Injectable()
export class LikeService {
    constructor(
        @InjectClient()
        private readonly pg:Client

    ){

    }

    async change(userid:number,postid:number){
        try {
            const isExist= await this.pg.query(
                'SELECT * FROM likes WHERE userid= $1 AND postid = $2',[userid,postid]
            )
            
            if(isExist.rows.length>0){
                await this.pg.query(
                    'DELETE FROM likes WHERE userid= $1 AND postid = $2',[userid,postid]
                    )
            }
            else{
                await this.pg.query(
                'INSERT INTO likes (userid,postid)  VALUES ($1, $2) RETURNING *',
                [userid,postid]
                )
            }
        } catch (error) {
            console.log(error)
        }        
    }

    async getLikeByPost(postid:number){
        try {
            const list = await this.pg.query(
                'SELECT * FROM likes WHERE postid= $1',[postid]
            )
            return list.rows
        } catch (error) {
            console.log(error)
        }
    }


}
