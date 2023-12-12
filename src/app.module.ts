import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderService } from './provider/provider.service';
import { ProvidersService } from './providers/providers.service';
import { ProviderModule } from './provider/provider.module';
import { ProviderService } from './provider/provider.service';

@Module({
  imports: [ProviderModule],
  controllers: [AppController],
  providers: [AppService, ProviderService, ProvidersService],
})
export class AppModule {}
