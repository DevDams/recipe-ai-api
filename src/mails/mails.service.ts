import { Injectable } from "@nestjs/common";
import * as sendgridMail from '@sendgrid/mail'
import { MailInput } from "./mail.input";

@Injectable()
export class MailsService {
  constructor() {
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendMail(input: MailInput) {
    await sendgridMail.send({
      from: process.env.SENDGRID_FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
    })
  }
}