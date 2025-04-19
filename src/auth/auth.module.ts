import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/lib/mail/mail.module';
import { UserModule } from 'src/module/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
