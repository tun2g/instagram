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


@Module({
  imports: [
    PostgresModule.forRoot(postgresConfig),
    UserModule, PostModule, JwtModule, CommentModule, LikeModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
