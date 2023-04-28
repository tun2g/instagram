import { Module } from '@nestjs/common';
import { CloudinaryServiceController } from './cloudinary.controller';
import { CloudinaryServiceService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [CloudinaryServiceController],
  providers: [CloudinaryServiceService,CloudinaryProvider]
})
export class CloudinaryServiceModule {}
