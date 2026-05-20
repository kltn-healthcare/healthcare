import { Injectable, Logger } from '@nestjs/common';
import {
  NotificationType,
  Prisma,
  ReminderChannel,
  ReminderStatus,
  ReminderType,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseService } from '../common/firebase/firebase.service';
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';

type CreateNotificationInput = {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Prisma.InputJsonValue;
  push?: boolean;
  actionUrl?: string;
};

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async registerDeviceToken(userId: string, dto: RegisterDeviceTokenDto) {
    return this.prisma.userDeviceToken.upsert({
      where: { token: dto.token },
      create: {
        userId,
        token: dto.token,
        platform: dto.platform?.trim().toUpperCase() || 'WEB',
        userAgent: dto.userAgent,
        isActive: true,
        lastSeenAt: new Date(),
      },
      update: {
        userId,
        platform: dto.platform?.trim().toUpperCase() || 'WEB',
        userAgent: dto.userAgent,
        isActive: true,
        lastSeenAt: new Date(),
      },
      select: {
        id: true,
        platform: true,
        isActive: true,
        lastSeenAt: true,
      },
    });
  }

  async list(userId: string) {
    const [items, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          type: true,
          title: true,
          body: true,
          data: true,
          readAt: true,
          createdAt: true,
        },
      }),
      this.prisma.notification.count({
        where: { userId, readAt: null },
      }),
    ]);

    return { items, unreadCount };
  }

  async markRead(userId: string, id: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  async markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  async createNotification(input: CreateNotificationInput) {
    const notification = await this.prisma.notification.create({
      data: {
        userId: input.userId,
        type: input.type,
        title: input.title,
        body: input.body,
        data: input.data,
      },
      select: {
        id: true,
        userId: true,
        type: true,
        title: true,
        body: true,
        data: true,
        createdAt: true,
      },
    });

    if (input.push) {
      await this.sendPushToUser(input.userId, {
        type: input.type,
        title: input.title,
        body: input.body,
        actionUrl: input.actionUrl,
        data:
          input.data && typeof input.data === 'object' && !Array.isArray(input.data)
            ? this.stringifyData(input.data as Record<string, unknown>)
            : undefined,
      });
    }

    return notification;
  }

  async sendPushToUser(
    userId: string,
    params: {
      type: NotificationType;
      title: string;
      body: string;
      actionUrl?: string;
      data?: Record<string, string>;
    },
  ) {
    const tokens = await this.prisma.userDeviceToken.findMany({
      where: { userId, isActive: true },
      select: { token: true },
    });

    if (!tokens.length) {
      return { successCount: 0, failureCount: 0 };
    }

    const response = await this.firebaseService.sendMulticast({
      tokens: tokens.map((item) => item.token),
      title: params.title,
      body: params.body,
      type: params.type,
      actionUrl: params.actionUrl,
      data: params.data,
    });

    if (response.failedTokens.length) {
      await this.prisma.userDeviceToken.updateMany({
        where: { token: { in: response.failedTokens } },
        data: { isActive: false },
      });
    }

    return response;
  }

  async markReminderSent(
    bookingId: string,
    channel: ReminderChannel,
    scheduledFor: Date,
  ) {
    return this.prisma.bookingReminderLog.upsert({
      where: {
        bookingId_channel_reminderType: {
          bookingId,
          channel,
          reminderType: ReminderType.BEFORE_APPOINTMENT,
        },
      },
      create: {
        bookingId,
        channel,
        scheduledFor,
        status: ReminderStatus.SENT,
        sentAt: new Date(),
        attemptCount: 1,
      },
      update: {
        status: ReminderStatus.SENT,
        sentAt: new Date(),
        scheduledFor,
        attemptCount: { increment: 1 },
        error: null,
      },
    });
  }

  async markReminderFailed(
    bookingId: string,
    channel: ReminderChannel,
    scheduledFor: Date,
    error: unknown,
  ) {
    const message = error instanceof Error ? error.message : String(error);
    this.logger.warn(
      `Reminder ${channel} failed for booking ${bookingId}: ${message}`,
    );

    return this.prisma.bookingReminderLog.upsert({
      where: {
        bookingId_channel_reminderType: {
          bookingId,
          channel,
          reminderType: ReminderType.BEFORE_APPOINTMENT,
        },
      },
      create: {
        bookingId,
        channel,
        scheduledFor,
        status: ReminderStatus.FAILED,
        attemptCount: 1,
        error: message,
      },
      update: {
        status: ReminderStatus.FAILED,
        scheduledFor,
        attemptCount: { increment: 1 },
        error: message,
      },
    });
  }

  private stringifyData(data: Record<string, unknown>): Record<string, string> {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, String(value)]),
    );
  }
}
