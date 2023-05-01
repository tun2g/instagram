import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectClient() 
        private readonly pg : Client
    ){

    }

    public async findAll(): Promise<any> {
        try {
            
            const users = await this.pg.query('SELECT * FROM users');
            return users.rows;
        } catch (error) {
            console.log(error)
        }
    }

    public async maxId(): Promise<any>{
        try {
            
            const users = await this.pg.query('SELECT * FROM users');
            return users.rows[users.rows.length-1]?.userid;
        } catch (error) {
            console.log(error)
        }       
    }
    
    public async createUser(user:CreateUserDto):Promise<any>{
        try {
            let newUser:User={...user,userid:2,avatar:"",description:null}
            let maxId:number=await this.maxId()
            if (typeof (maxId)!== 'number' )
            {
                maxId=0
            }
            newUser.userid=maxId+1
            newUser.avatar=process.env.DEFAULT_AVATAR
            await this.pg.query(
              'INSERT INTO users (fullname, password,username,userid,avatar)  VALUES ($1, $2,$3,$4,$5) RETURNING *',
              [newUser.fullname, newUser.password,newUser.username,newUser.userid,newUser.avatar],
            );
            
          } catch (err) {
            console.log(err)
        }
    }

    public async updatePassword(user:User):Promise<any>{
        try {
            await this.pg.query(
              `UPDATE users SET password = $1 WHERE userid = $2;`,
              [user.password, user.userid],
            );
          } catch (error) {
            console.log(error);
          }
    }

    public async updateInformation(userid:number,obj:Object):Promise<any>{
        try {
            const keys = Object.entries(obj).map(([key, value], index) => `${key}=$${index + 1}`).join(", ");
            const values = Object.entries(obj).map(([key, value], index) => value);

            values.push(Number(userid))
            
            const numberFields= Object.entries(obj).length
            await this.pg.query(
                `UPDATE users SET ${keys} WHERE userid= $${numberFields+1}`,
                values
            )
        } catch (error) {
            console.log(error)
        }
    }

    public async findUserById(id:number):Promise<any>{
        try {
            const user=await this.pg.query(
                `SELECT users.fullname,users.avatar,users.username,users.description,users.userid FROM users WHERE userid = $1`,
            [id])
            return user.rows
        } catch (error) {
            console.log(error)
        }
    }

    public async findUserByName(username:string):Promise<any>{
        try {
            const user=await this.pg.query(
                `SELECT users.fullname,users.avatar,users.username,users.description,users.userid FROM users WHERE username = $1`,
                [username]
            )
            return user.rows
        } catch (error) {
            console.log(error)
        }
    }

    public async findUserByNameServer(username:string):Promise<any>{
        try {
            const user=await this.pg.query(
                `SELECT * FROM users WHERE username = $1`,
                [username]
            )
            return user.rows
        } catch (error) {
            console.log(error)
        }
    }
    
    public async deleteUserById(id:number):Promise<any>{
        try {
            await this.pg.query(
                `DELETE FROM users WHERE userid=$1`,
                [id]
            )
        } catch (error) {
            console.log(error)
        }
    }

}
