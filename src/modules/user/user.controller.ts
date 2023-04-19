import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request,Response } from 'express';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';

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

    @Get('max-id')
    async getMaxId(@Res() res:Response){
        try {
            const id = await this.userService.maxId()
            res.json({id})
        } catch (error) {
            
        }
    }

    @Post('create')
    async createUser(@Req() req:Request, @Res() res:Response){
        try {
            const newUser:CreateUserDto=req.body
            await this.userService.createUser(newUser)
            res.json({"status":500,"message":"create successfully"})
            
        } catch (error) {
            console.log(error)
            res.json({err:"database error"})
        }
    }


    // update password
    @Post('update')
    async updateUser(@Req() req:Request,@Res() res:Response){
        try {
            const updateUser:User=req.body
            await this.userService.updateUser(updateUser)
            res.json({"status":500,"message":"update successfully"})

        } catch (error) {
            console.log(error)
            res.json({err:"database error"})
        }
    }

    @Get('get/:id')
    async getUserById(@Req() req:Request, @Res() res:Response){
        try {
            const id:number=parseInt(req.params.id);
            const user= await this.userService.findUserById(id)
            console.log(user)
            if(user){
                res.json({user,status:500})
            }
            else {
                res.send({status:200,message:"user isn't exist"})
            }
        } catch (error) {
            console.log(error)
            res.json({err:"database error"})

        }
    }

    @Delete('delete/:id')
    async deleteUserById(@Req() req:Request, @Res() res:Response){
        try {
            const id:number=parseInt(req.params.id);
            const user= await this.userService.deleteUserById(id)
            console.log(user)
            res.json({message:"delete successfully",status:500})

        } catch (error) {
            console.log(error)
            res.json({err:"database error"})

        }
    }

}
