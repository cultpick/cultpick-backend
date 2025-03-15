import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './module/address/address.module';
import { PerformanceModule } from './module/performance/performance.module';
import { PickModule } from './module/pick/pick.module';
import { UserModule } from './module/user/user.module';
import { CategoryModule } from './module/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AddressModule,
    PerformanceModule,
    PickModule,
    UserModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
