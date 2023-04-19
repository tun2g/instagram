import { Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request,Response } from 'express';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthService } from 'src/services/auth.service';
import { PersonalJwtAuthGuard } from 'src/services/personaljwtauth.guard';
import { JwtService } from '../jwt/jwt.service';
import { Jwt } from '../jwt/jwt.entity';

const bcrypt=require('bcrypt')

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService,
        private authService:AuthService,
        private jwtService:JwtService,
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

    @Post('register')
    async register(@Req() req:Request, @Res() res:Response){
        try {
            const newUser:CreateUserDto=req.body
            
            const isExist=await this.userService.findUserByName(newUser.username)

            if(isExist.length>0){
                res.json({status:200,"message":"This username already exists"})
            }
            else {
                
                const salt=await bcrypt.genSalt(10)
                const hashedPassword=await bcrypt.hash(newUser.password,salt)
                newUser.password=hashedPassword
                await this.userService.createUser(newUser)
                res.json({"status":500,"message":"create successfully"})
            }
            
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

    @UseGuards(PersonalJwtAuthGuard)
    @Get('get/:id')
    async getUserById(@Req() req:Request, @Res() res:Response){
        try {
            const id:number=parseInt(req.params.id);
            const user= await this.userService.findUserById(id)
            if(user.length>0){
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
            res.json({message:"delete successfully",status:500})

        } catch (error) {
            console.log(error)
            res.json({err:"database error"})

        }
    }

    @Post('login')
    async login(@Req() req:Request, @Res() res:Response){
        try {
            const account:LoginUserDto=req.body
            const isExist= await this.userService.findUserByName(account.username)
            if(isExist.length>0){
                const user:User=isExist[0]
                const isRightPassword=await bcrypt.compare(account.password,user.password)

                if(isRightPassword){
                    
                    const accessToken= await this.authService.genarateAccessToken(user.userid)
                    const refreshToken= await this.authService.genarateRefreshToken(user.userid)

                    const jwtReq:Jwt={
                        userid: user.userid,
                        refreshtoken:refreshToken.refreshToken
                    }

                    this.jwtService.addRefreshToken(jwtReq)
                    
                    console.log(accessToken)
                    console.log(refreshToken)
                    
                    res.json({message:"Login successfully"})
                }
                else {
                res.json({message:"username or password is not correct"})
                }
            }
            else{
                res.json({message:"username or password is not correct"})
            }
            
        } catch (error) {
            
        }
    }

}
