import { Controller, Get, Post, Req, Res,Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment-dto';
import { Comment } from './comment.entity';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService:CommentService
    ){

    }

    @Post('/create')
    async createComment(@Req() req:Request,@Res() res:Response){
        try {
            const comment:CreateCommentDto=req.body
            console.log(req.body)
            await this.commentService.createComment(comment)
            res.json({message:"create comment"})
        } catch (error) {
            console.log(error)
        }

    }

    @Get('get/:id')
    async getCommentsByPost(@Req() req:Request,@Res() res:Response){
        try {
            const postid:number=parseInt(req.params.id)
            const list = await this.commentService.getCommentsByPost(postid)
            res.json({list})
        } catch (error) {
            console.log(error)
        }
    }

    @Post('update')
    async updateComment(@Req() req:Request,@Res() res:Response){
        try {
            const reqBody:Comment=req.body
            await this.commentService.updateComment(reqBody)
            res.json({"message": "update successfully"})
        } catch (error) {
            console.log(error)
        }
        
    }

    @Delete('delete')
    async deleteComment(@Req() req:Request,@Res() res:Response){
        try {
            const commentid:number=req.body.commentid
            await this.commentService.deleteComment(commentid)
            res.json({"message":"delete comment"})
        } catch (error) {
            console.log(error)
        }
    }

}
