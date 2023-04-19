import { Controller, Post, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService:CommentService
    ){

    }


}
