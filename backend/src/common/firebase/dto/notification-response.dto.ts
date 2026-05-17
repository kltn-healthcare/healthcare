export class NotificationResponseDto {
  successCount: number;
  failureCount: number;
  successTokens: string[];
  failedTokens: string[];
  errorMessage?: string;
}
