import { Module } from '@nestjs/common';
import { NotificationRepository } from '@domain/repositories/notification-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
