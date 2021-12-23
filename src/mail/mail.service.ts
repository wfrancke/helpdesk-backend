import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(
    email: string,
    name: string,
    userId: string,
    teamId: string,
  ): Promise<SentMessageInfo> {
    const url = `http://192.168.1.4:3000/users/confirm/${userId}/to/${teamId}`;

    return this.mailerService.sendMail({
      to: email,
      subject: 'Confirm team member',
      template: './confirmation',
      context: {
        url,
        name,
      },
    });
  }
}
