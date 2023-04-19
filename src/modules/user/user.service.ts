import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';

@Injectable()
export class UserService {
    constructor(@InjectClient() 
        private readonly pg : Client
    ){

    }

    public async findAll(): Promise<any> {
        const users = await this.pg.query('SELECT * FROM users');
        return users.rows;
    }
}
