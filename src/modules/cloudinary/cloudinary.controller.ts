import { Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryServiceService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response,Request, Express } from 'express';

@Controller('files')
export class CloudinaryServiceController {
    constructor(
        private cloudinaryService:CloudinaryServiceService
    ){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file :Express.Multer["File"],
        @Req() req:Request,
        @Res() res:Response
        ): Promise<string> 
    {
        try {
            res.json({message:"uploaded",status:500})
            return await this.cloudinaryService.upload(file);
            
        } catch (error) {
            console.log(error)
            res.json({message:"upload failed",status:200})
        }
    }
}
