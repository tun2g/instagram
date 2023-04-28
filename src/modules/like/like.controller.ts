import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { LikeService } from './like.service';
import { Request, Response } from 'express';
import { Like } from './like.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('like')
@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ){

    }
    
    @ApiOperation({summary:"handler click 'Like' button in a post"})
    @Post()
    async like(@Req() req:Request,@Res() res:Response){
        try {
            const reqBody:Like= req.body
            await this.likeService.change(reqBody.userid,reqBody.postid)
            res.json({message:"liked"})

        } catch (error) {
            console.log(error)
        }
    }

    @ApiOperation({summary:"get all likes in a post [...,{userid,postid}] "})
    @Get('/get/:id')
    async getLikeByPost(@Req() req:Request,@Res() res:Response){
        try {
            const postid:number= parseInt(req.params.id)
            const list= await this.likeService.getLikeByPost(postid)
            res.json({list})
        } catch (error) {
            console.log(error)
        }
    }
}
