import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { PostgresModule } from 'nest-postgres';
import { postgresConfig } from './config/posgresConfig';
import { JwtModule } from './modules/jwt/jwt.module';
import { JwtService } from './modules/jwt/jwt.service';
import { CommentModule } from './modules/comment/comment.module';
import { LikeModule } from './modules/like/like.module';
import { CloudinaryServiceModule } from './modules/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { FollowModule } from './modules/follow/follow.module';


@Module({
  imports: [
    PostgresModule.forRoot(postgresConfig),
    UserModule, PostModule, JwtModule, CommentModule, LikeModule, CloudinaryServiceModule,
    MulterModule.register(),
    FollowModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService]
})
export class AppModule {}
