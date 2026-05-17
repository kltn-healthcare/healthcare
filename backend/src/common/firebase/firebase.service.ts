import { Inject, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN_TOKEN } from './constants/firebase.constants';
import { SendNotificationDto } from './dto/send-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private readonly messaging: admin.messaging.Messaging;

  constructor(
    @Inject(FIREBASE_ADMIN_TOKEN) private readonly firebaseApp: admin.app.App,
  ) {
    this.messaging = admin.messaging(this.firebaseApp);
  }

  /**
   * Send notification to a single device token.
   */
  async sendToDevice(
    token: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<string | null> {
    try {
      const messageId = await this.messaging.send({
        token,
        notification: { title, body },
        data,
      });
      return messageId;
    } catch (error) {
      this.logger.error(
        `Failed to send notification to token: ${error instanceof Error ? error.message : String(error)}`,
      );
      return null;
    }
  }

  /**
   * Send notification to multiple device tokens (multicast).
   * Returns detailed success/failure info per token.
   */
  async sendMulticast(
    dto: SendNotificationDto,
  ): Promise<NotificationResponseDto> {
    const { tokens, title, body, type, imageUrl, actionUrl, data } = dto;

    if (!tokens.length) {
      return {
        successCount: 0,
        failureCount: 0,
        successTokens: [],
        failedTokens: [],
      };
    }

    const fcmData: Record<string, string> = {
      type,
      ...(actionUrl && { action_url: actionUrl }),
      ...data,
    };

    try {
      const message: admin.messaging.MulticastMessage = {
        tokens,
        notification: {
          title,
          body,
          ...(imageUrl && { imageUrl }),
        },
        data: fcmData,
      };

      const response = await this.messaging.sendEachForMulticast(message);

      const successTokens: string[] = [];
      const failedTokens: string[] = [];

      response.responses.forEach((res, index) => {
        if (res.success) {
          successTokens.push(tokens[index]);
        } else {
          failedTokens.push(tokens[index]);
          this.logger.warn(
            `Failed token ${tokens[index]}: ${res.error?.message}`,
          );
        }
      });

      return {
        successCount: response.successCount,
        failureCount: response.failureCount,
        successTokens,
        failedTokens,
        errorMessage:
          response.failureCount > 0
            ? `${response.failureCount} notification(s) failed to send`
            : undefined,
      };
    } catch (error) {
      this.logger.error(
        `Multicast notification failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      return {
        successCount: 0,
        failureCount: tokens.length,
        successTokens: [],
        failedTokens: tokens,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
