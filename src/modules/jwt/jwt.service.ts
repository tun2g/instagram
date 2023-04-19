import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { Jwt } from './jwt.entity';

@Injectable()
export class JwtService {
    constructor(
        @InjectClient() 
        private readonly pg : Client
    ){

    }

    async addRefreshToken(req:Jwt){
        try {
            let isExist= await this.pg.query(
                'SELECT * FROM refreshtokens WHERE userid = $1',[req.userid]
            )
            

            if(isExist.rows.length>0){

                await this.pg.query(`UPDATE refreshtokens SET refreshtoken = $1 WHERE userid = $2;`,
                [req.refreshtoken,req.userid]
                )

            }
            else{
              await this.pg.query('INSERT INTO refreshtokens (userid, refreshtoken)  VALUES ($1, $2) RETURNING *',
              [req.userid,req.refreshtoken]
              )
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        const lists=await this.pg.query('SELECT * FROM refreshtokens')
        return lists.rows
    }

    async getRefreshTokenByUserid(userid:number){
        const users = await this.pg.query('SELECT * FROM refreshtokens WHERE userid = $1',[userid]);
        return users.rows[0].refreshtoken   
    }
}
