import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostService {
    async getListPosts(){
        return "list posts"
    }
    async createPost(data:CreatePostDto){
     return data   
    }
}
