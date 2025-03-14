import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { PerformanceModule } from './modules/performance/performance.module';
import { PickModule } from './modules/pick/pick.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';

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
