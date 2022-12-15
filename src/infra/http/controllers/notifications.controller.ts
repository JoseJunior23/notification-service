import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@domain/services/send-notification-service';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificatioViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@domain/services/cancel-notification-service';
import { ReadNotification } from '@domain/services/read-notification-service';
import { UnreadNotification } from '@domain/services/unread-notification-service';
import { CountRecipientNotification } from '@domain/services/count-recipient-notification-service';
import { GetRecipientNotification } from '@domain/services/get-recipient-notification-service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
    return {
      notification: NotificatioViewModel.toHTTP(notification),
    };
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });
    return { notifications: notifications.map(NotificatioViewModel.toHTTP) };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }
}
