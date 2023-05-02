import {  Controller,Get, Req, Res, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { Request,Response } from 'express';
import { PersonalJwtAuthGuard } from 'src/services/personaljwtauth.guard';
import { BaseController } from '../base/base.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController extends BaseController<CreatePostDto>{
    constructor(private readonly postService: PostService) {
        super(postService);
      }
    

    @ApiOperation({summary:"get all posts by a user"})
    // @UseGuards(PersonalJwtAuthGuard)
    @Get('get-post-user/:id')
    async getAllPosts(@Req() req:Request,@Res() res:Response){
        try {
          const username:string=req.params.id
            const list =  await this.postService.getPostsByUser(username)
            res.json({list})
        } catch (error) {
            console.log(error)
        }
    }


    @ApiOperation({summary:"get all posts"})
    // @UseGuards(PersonalJwtAuthGuard)
    @Get('get/:id')
    async getPostsByUser(@Req() req:Request,@Res() res:Response){
        try {
            const list =  await this.postService.getAllPosts()
            res.json({list})
        } catch (error) {
            console.log(error)
        }
    }

}
