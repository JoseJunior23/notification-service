import { Module } from '@nestjs/common';
import { SendNotification } from '@domain/services/send-notification-service';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@domain/services/cancel-notification-service';
import { CountRecipientNotification } from '@domain/services/count-recipient-notification-service';
import { ReadNotification } from '@domain/services/read-notification-service';
import { UnreadNotification } from '@domain/services/unread-notification-service';
import { GetRecipientNotification } from '@domain/services/get-recipient-notification-service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
