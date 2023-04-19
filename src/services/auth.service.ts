import { Injectable } from '@nestjs/common';
import * as jwtService from 'jsonwebtoken';

@Injectable()
export class AuthService {

  async genarateAccessToken(userid:number) {
    const payload = { 
        userid,
    };
    return {
      accessToken: jwtService.sign(payload,process.env.JWT_ACCESS_KEY,{expiresIn:"1800s"})
    };
  }

  async genarateRefreshToken(userid:number){
    const payload = { 
        userid,
        refreshToken:process.env.JWT_REFRESH_KEY,    
    };
    return {
      refreshToken: jwtService.sign(payload,process.env.JWT_REFRESH_KEY,{expiresIn:60*60*24*30})
    };  
  }

}