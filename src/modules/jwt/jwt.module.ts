import { Module } from '@nestjs/common';
import { JwtController } from './jwt.controller';
import { JwtService } from './jwt.service';
import { AuthService } from 'src/services/auth.service';

@Module({
  controllers: [JwtController],
  providers: [JwtService,AuthService]
})
export class JwtModule {}
