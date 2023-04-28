import { Controller, Get, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from './jwt.service';
import { AuthService } from 'src/services/auth.service';
import * as jwt from 'jsonwebtoken';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('json web token')
@Controller('jwt')
export class JwtController {
    constructor(
        private jwtService:JwtService,
        private authService:AuthService
    ){

    }

    @ApiOperation({summary:"request refresh access-token by refresh-token"})
    @Get('refresh')
   async refreshAccessToken(@Req() req:Request,@Res()  res:Response){
        const {userid,refreshToken} = req.body
        const refreshTokenDB=await this.jwtService.getRefreshTokenByUserid(userid)
        if(refreshToken===refreshTokenDB){
            try {
                const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY) 

                const newAccessToken= await this.authService.genarateAccessToken(userid)
                res.json({accessToken:newAccessToken})

            } catch (error) {
                console.log(error)
                res.json({message:"Token has expired"})
            }
            
        }
        else {
            res.json({message:"Invalid token"})
        }
   }
   
   @Get()
   async getAll(@Res() res:Response){
    try {
        const lists= await this.jwtService.getAll()
        res.json({lists})        
    } catch (error) {
     console.log(error)   
    }

   }
}
