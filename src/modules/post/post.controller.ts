import { Body, Controller,Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){

    }

    @Get()
    async getListPosts(){
        return await this.postService.getListPosts()
    }
    
    @Post('create')
    async createPost(@Body() data:CreatePostDto)
    {
        return this.postService.createPost(data)
    }
}
