import { Controller, Get, Post, Req, Res,Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment-dto';
import { Comment } from './comment.entity';
import { BaseController } from '../base/base.controller';

@Controller('comment')
export class CommentController extends BaseController<CreateCommentDto>{
    constructor(private readonly commentService: CommentService) {
        super(commentService);
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

}
