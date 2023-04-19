import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/services/auth.service';
import { JwtService } from '../jwt/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService,AuthService,JwtService]
})
export class UserModule {}
