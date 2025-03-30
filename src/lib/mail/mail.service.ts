import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(code: string): Promise<boolean> {
    await this.mailerService
      .sendMail({
        from: process.env.SMTP_FROM,
        to: 'aptheparker@gmail.com',
        subject: 'CultPick 이메일 인증 안내드립니다',
        template: './verification.hbs',
        context: {
          code,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        throw new ConflictException(error);
      });

    return true;
  }
}
