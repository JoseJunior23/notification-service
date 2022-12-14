import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '../../../application/services/send-notification-service';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notification')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
    return { notification };
  }
}
