import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './providers/prisma.module';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule,
    PrismaModule,
    AuthModule,
    UserModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
