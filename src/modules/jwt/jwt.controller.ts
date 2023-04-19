import { Controller, Get, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from './jwt.service';
import { AuthService } from 'src/services/auth.service';
@Controller('jwt')
export class JwtController {
    constructor(
        private jwtService:JwtService,
        private authService:AuthService
    ){

    }
    @Get('refresh')
   async refreshAccessToken(@Req() req:Request,@Res()  res:Response){
        const {userid,refreshToken} = req.body
        const refreshTokenDB=await this.jwtService.getRefreshTokenByUserid(userid)
        if(refreshToken===refreshTokenDB){
            const newAccessToken= await this.authService.genarateAccessToken(userid)
            res.json({accessToken:newAccessToken})
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
        
    }

   }
}
