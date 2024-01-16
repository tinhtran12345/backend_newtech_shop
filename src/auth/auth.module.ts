import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
