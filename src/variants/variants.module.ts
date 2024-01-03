import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [VariantsService],
  exports: [VariantsService],
})
export class VariantsModule {}
