import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './providers/prisma.module';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { VariantsController } from './variants/variants.controller';
import { VariantsModule } from './variants/variants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule,
    PrismaModule,
    AuthModule,
    UserModule,
    AddressModule,
    ProductsModule,
    VariantsModule,
  ],
  controllers: [AppController, VariantsController],
  providers: [AppService],
})
export class AppModule {}
