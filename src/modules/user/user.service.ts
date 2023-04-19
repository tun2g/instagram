import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async getListUsers(){
        return "List users"
    }
}
