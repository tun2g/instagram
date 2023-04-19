import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { PostgresModule } from 'nest-postgres';
import { postgresConfig } from './config/posgresConfig';


@Module({
  imports: [
    PostgresModule.forRoot(postgresConfig),
    UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
