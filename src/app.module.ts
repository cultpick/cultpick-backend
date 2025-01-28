import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PerformanceModule } from './performance/performance.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [AuthModule, AddressModule, PerformanceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
