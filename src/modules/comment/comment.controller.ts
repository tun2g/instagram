import { Controller, Get, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment-dto';
import { BaseController } from '../base/base.controller';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController extends BaseController<CreateCommentDto>{
    constructor(private readonly commentService: CommentService) {
        super(commentService);
      }
    
    @ApiOperation({ summary: 'Get all comments in a post' })
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
