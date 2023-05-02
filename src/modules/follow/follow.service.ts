import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';
import { CreateFollowDto } from './dto/create-follow-dto';

@Injectable()
export class FollowService {
    constructor(
        @InjectClient()
        private readonly pg:Client

    ){

    } 
    
    async addFollow(follow:CreateFollowDto):Promise<any>{
        try {
            await this.pg.query(
            'INSERT INTO follows (userid,followuser)  VALUES ($1, $2) RETURNING *',[follow.userid,follow.followuser]
            ) 
        } catch (error) {
            console.log(error)
        }
    }

    async unfollow(follow:CreateFollowDto){
        try {
            await this.pg.query(
                `DELETE FROM follows WHERE userid = $1 AND followuser = $2`,[follow.userid,follow.followuser]
            )
        } catch (error) {
            console.log(error)
        }
    }

    // all account follow this user
    async getListFollower(userid:number):Promise<any>{
        try {
            const list =await this.pg.query(
                'SELECT * FROM follows WHERE followuser = $1',[userid]
            )
            return list.rows
        } catch (error) {
            console.log(error)            
        }
    }


    //list of accounts which this user is following
    async getListFollowing(userid:number){
        try {
            const list =await this.pg.query(
                'SELECT * FROM follows WHERE userid = $1',[userid]
            )
            return list.rows
        } catch (error) {
            console.log(error)
        }
    }

    async isFollowed(follow:CreateFollowDto){
        try {
            const isFollowed=await this.pg.query(
                'SELECT * FROM follows WHERE userid= $1 AND followuser= $2',[follow.userid,follow.followuser]
            )
            return isFollowed.rows.length
        } catch (error) {
            console.log(error)
        }
    }
    async getIdbyUsername(username:string):Promise<any>{
        try {
            const user= await this.pg.query(
                'SELECT users.userid FROM users WHERE username = $1',[username]
            )
            return user.rows[0]
        } catch (error) {
            console.log(error)
        }
    }   
}
