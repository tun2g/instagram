import {  Controller,Delete,Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { Request,Response } from 'express';
import { Posts } from './post.entity';
import { PersonalJwtAuthGuard } from 'src/services/personaljwtauth.guard';

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){

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

    @Post('create')
    async createPost(@Req() req:Request,@Res() res:Response){
        try {

            const reqBody:CreatePostDto=req.body
            await this.postService.createPost(reqBody)
            res.json({"message":"create successfully"})
        } catch (error) {
           console.log(error) 
        }
    }

    @Post('update')
    async updatePost(@Req() req:Request,@Res() res:Response){
        try {
            const reqBody:Posts=req.body
            await this.postService.updatePost(reqBody)
            res.json({"message": "update successfully"})
        } catch (error) {
            
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

    @Delete('delete')
    async deletePost(@Req() req:Request,@Res() res:Response){
        try {
            const postid:number=req.body.postid
            await this.postService.deletePost(postid)
        } catch (error) {
            console.log(error)
        }
    }
}
