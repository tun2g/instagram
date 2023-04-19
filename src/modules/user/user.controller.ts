import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request,Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){

    }

    @Get()
    async findAll(@Req() req:Request,@Res() res:Response){
        try {

            const users =  await this.userService.findAll()
            res.json({users})
        } catch (error) {
            console.log(error)
            res.json({err:"database error"})
        }
    }

    


}
