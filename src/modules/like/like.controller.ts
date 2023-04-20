import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { LikeService } from './like.service';
import { Request, Response } from 'express';
import { Like } from './like.entity';

@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ){

    }
    
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
