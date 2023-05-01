import { Controller, Delete, Get, Post, Req, Res, UseGuards,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Request,Response } from 'express';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthService } from 'src/services/auth.service';
import { PersonalJwtAuthGuard } from 'src/services/personaljwtauth.guard';
import { JwtService } from '../jwt/jwt.service';
import { Jwt } from '../jwt/jwt.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const bcrypt=require('bcrypt')

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private userService:UserService,
        private authService:AuthService,
        private jwtService:JwtService,
    ){

    }

    @ApiOperation({summary:"get all users"})
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

    @ApiOperation({summary:"get userid of the last user in database"})
    @Get('max-id')
    async getMaxId(@Res() res:Response){
        try {
            const id = await this.userService.maxId()
            res.json({id})
        } catch (error) {
            
        }
    }

    @ApiOperation({summary:"register user account"})
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
    @ApiOperation({summary:"update password"})
    @Post('update/password/:id')
    async updateUser(@Req() req:Request,@Res() res:Response){
        try {
            const updateUser:User=req.body
            await this.userService.updatePassword(updateUser)
            res.json({"status":500,"message":"update password successfully"})

        } catch (error) {
            console.log(error)
            res.json({err:"database error"})
        }
    }


    @ApiOperation({summary:"update"})
    @Post('update/information/:id')
    async updateInformation(@Param('id') userid:number ,@Req() req:Request,@Res() res:Response){
        try {
            const fieldsUpdate:Object=req.body
            await this.userService.updateInformation(userid,fieldsUpdate)
            const user= await this.userService.findUserById(userid)
            res.json({user,status:500,message:"update successfully"})
        } catch (error) {
            console.log(error)
            res.json({err:"database error"})
        }
    }

    @ApiOperation({summary:"get a user account by userid"})
    // @UseGuards(PersonalJwtAuthGuard)
    @Get('get/by-id/:id')
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

    @Get('get/by-username/:username')
    async getUserByUsername(@Req() req:Request, @Res() res:Response){
        try {
            const username:string=req.params.username;
            const user= await this.userService.findUserByName(username)
            if(user?.length>0){
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

    @ApiOperation({summary:"Login"})
    @Post('login')
    async login(@Req() req:Request, @Res() res:Response){
        try {
            const account:LoginUserDto=req.body
            const isExist= await this.userService.findUserByNameServer(account.username)
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
                    
                    res.json({message:"Login successfully",status:500,
                        data:
                            {
                                username:user.username,
                                profilePicture:user.avatar,
                                accessToken,
                                userid:user.userid,
                                fullname:user.fullname
                            }
                    })
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

    @Get('logout')
    async logOut(@Req() req:Request, @Res() res:Response){
        try {
            const userid=req.body.userid
            await this.jwtService.deleteToken(userid)
            res.json({message:"logout"})
        } catch (error) {
            console.log(error)
        }
    }

}
