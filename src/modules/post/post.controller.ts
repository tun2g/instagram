import {  Controller,Delete,Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { Request,Response } from 'express';
import { Posts } from './post.entity';
import { PersonalJwtAuthGuard } from 'src/services/personaljwtauth.guard';
import { BaseController } from '../base/base.controller';

@Controller('post')
export class PostController extends BaseController<CreatePostDto>{
    constructor(private readonly postService: PostService) {
        super(postService);
      }

    @Get('all')
    async getListPosts(@Req() req:Request,@Res() res:Response){
        try {

            const list =await this.postService.getAllPosts()
            res.json({list})
        } catch (error) {
            console.log(error)
        }
    }



    @UseGuards(PersonalJwtAuthGuard)
    @Get('get/:id')
    async getPostsByUser(@Req() req:Request,@Res() res:Response){
        try {
            const userid:number=parseInt(req.params.id)
            const list =  await this.postService.getPostsByUser(userid)
            res.json({list})
        } catch (error) {
            console.log(error)
        }
    }

}
