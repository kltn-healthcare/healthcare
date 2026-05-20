CREATE TYPE "NotificationType" AS ENUM (
  'BOOKING_CREATED',
  'BOOKING_CONFIRMED',
  'BOOKING_CANCELLED',
  'BOOKING_REMINDER'
);

CREATE TYPE "ReminderChannel" AS ENUM (
  'EMAIL',
  'IN_WEB',
  'WEB_PUSH'
);

CREATE TYPE "ReminderType" AS ENUM (
  'BEFORE_APPOINTMENT'
);

CREATE TYPE "ReminderStatus" AS ENUM (
  'PENDING',
  'SENT',
  'FAILED',
  'SKIPPED'
);

CREATE TABLE "user_device_tokens" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "platform" VARCHAR(20) NOT NULL DEFAULT 'WEB',
  "user_agent" TEXT,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "last_seen_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL,

  CONSTRAINT "user_device_tokens_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "notifications" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "type" "NotificationType" NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "data" JSONB,
  "read_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "booking_reminder_logs" (
  "id" TEXT NOT NULL,
  "booking_id" TEXT NOT NULL,
  "channel" "ReminderChannel" NOT NULL,
  "reminder_type" "ReminderType" NOT NULL DEFAULT 'BEFORE_APPOINTMENT',
  "scheduled_for" TIMESTAMPTZ NOT NULL,
  "status" "ReminderStatus" NOT NULL DEFAULT 'PENDING',
  "sent_at" TIMESTAMPTZ,
  "attempt_count" INTEGER NOT NULL DEFAULT 0,
  "error" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL,

  CONSTRAINT "booking_reminder_logs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_device_tokens_token_key" ON "user_device_tokens"("token");
CREATE INDEX "user_device_tokens_user_id_is_active_idx" ON "user_device_tokens"("user_id", "is_active");

CREATE INDEX "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");
CREATE INDEX "notifications_user_id_read_at_idx" ON "notifications"("user_id", "read_at");

CREATE UNIQUE INDEX "booking_reminder_logs_booking_id_channel_reminder_type_key"
  ON "booking_reminder_logs"("booking_id", "channel", "reminder_type");
CREATE INDEX "booking_reminder_logs_status_scheduled_for_idx"
  ON "booking_reminder_logs"("status", "scheduled_for");
CREATE INDEX "bookings_status_booking_date_idx" ON "bookings"("status", "booking_date");

ALTER TABLE "user_device_tokens"
  ADD CONSTRAINT "user_device_tokens_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "notifications"
  ADD CONSTRAINT "notifications_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "booking_reminder_logs"
  ADD CONSTRAINT "booking_reminder_logs_booking_id_fkey"
  FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
