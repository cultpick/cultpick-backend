import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PerformanceModule } from './performance/performance.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PickModule } from './pick/pick.module';

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
