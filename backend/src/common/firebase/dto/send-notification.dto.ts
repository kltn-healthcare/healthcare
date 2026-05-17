import { IsArray, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendNotificationDto {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Array of FCM device tokens to send push to',
    example: ['fcm-token-xyz-123-abc-789'],
    type: [String],
  })
  tokens: string[];

  @IsString()
  @ApiProperty({
    description: 'Title of the notification',
    example: 'Nhắc lịch hẹn',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Body/Content of the notification',
    example: 'Bạn có lịch hẹn khám tại Phòng khám An Khang lúc 09:00 sáng mai.',
  })
  body: string;

  @IsString()
  @ApiProperty({
    description: 'Category/Type of notification for client-side routing',
    example: 'BOOKING_REMINDER',
  })
  type: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional URL to image to display alongside the notification',
    example: 'https://example.com/icon.png',
  })
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Deep link URL when user taps the notification',
    example: 'healthcare://bookings/123',
  })
  actionUrl?: string;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    description: 'Additional custom key-value pairs data',
    example: { bookingId: '123' },
  })
  data?: Record<string, string>;
}
