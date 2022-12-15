import { Notification } from '@domain/entities/notification';

export class NotificatioViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipienId: notification.recipientId,
    };
  }
}
