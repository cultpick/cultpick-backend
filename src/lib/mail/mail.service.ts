import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCodeMail(
    email: string,
    code: string,
  ): Promise<boolean> {
    await this.mailerService
      .sendMail({
        from: `CultPick 컬픽 <${process.env.SMTP_USER}>`,
        to: email,
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
