import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';


@Module({
  controllers: [],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}