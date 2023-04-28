import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryServiceService {
    async upload(file: Express.Multer["File"]): Promise<string> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream((error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            });
            toStream(file.buffer).pipe(upload);
          });
      }
}
