import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Request, Response } from 'express';
import { CreateFollowDto } from './dto/create-follow-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('follow')
@Controller('follow')
export class FollowController {
    constructor(
        private readonly followService:FollowService
    ){

    }

    @ApiOperation({summary:"handle follow activity"})
    @Post('activity')
    async followActivity(@Req() req:Request, @Res() res:Response){
        try {
            const follow:CreateFollowDto=req.body
            
            if (await this.followService.isFollowed(follow)){
                await this.followService.unfollow(follow)
                res.json({
                    status:500,
                    message:"unfollowed",
                })
            }
            else {
                await this.followService.addFollow(follow)
                res.json({
                    status:500,
                    message:"add follow",
                })
            }
            
        } catch (error) {
          console.log(error)
          res.json(
            {
                status:200,
                message:"error"
            }
          )   
        }
    }

    @ApiOperation({summary:"get list user's follower"})
    @Get('follower/:username')
    async listFollower(@Req() req:Request,@Res() res:Response,@Param('username') username:string){
        try {
            const userid=await this.followService.getIdbyUsername(username)
            const list=await this.followService.getListFollower(userid.userid)
            res.json({list,status:200,message:"got list"})
        } catch (error) {
            console.log(error)
        }
    }

    @ApiOperation({summary:"get list user'following"})
    @Get('following/:username')
    async listFollowing(@Req() req:Request,@Res() res:Response,@Param('username') username:string){
        try {
            const userid=await this.followService.getIdbyUsername(username)
            const list=await this.followService.getListFollowing(userid.userid)
            res.json({list,status:200,message:"got list"})
        } catch (error) {
            console.log(error)
        }
    }
}
