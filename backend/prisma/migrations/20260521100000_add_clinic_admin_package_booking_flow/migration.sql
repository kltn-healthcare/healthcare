ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'CLINIC_ADMIN';

CREATE TYPE "BookingType" AS ENUM ('DOCTOR_CONSULTATION', 'HEALTH_PACKAGE');

CREATE TABLE "clinic_admins" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "clinic_id" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL,
  CONSTRAINT "clinic_admins_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "clinic_admins_user_id_key" ON "clinic_admins"("user_id");
CREATE INDEX "clinic_admins_clinic_id_idx" ON "clinic_admins"("clinic_id");

ALTER TABLE "clinic_admins"
  ADD CONSTRAINT "clinic_admins_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "clinic_admins"
  ADD CONSTRAINT "clinic_admins_clinic_id_fkey"
  FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "clinic_working_hours" (
  "id" TEXT NOT NULL,
  "clinic_id" TEXT NOT NULL,
  "day_of_week" SMALLINT NOT NULL,
  "is_open" BOOLEAN NOT NULL DEFAULT true,
  "start_time" VARCHAR(5) NOT NULL,
  "end_time" VARCHAR(5) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL,
  CONSTRAINT "clinic_working_hours_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "clinic_working_hours_clinic_id_day_of_week_key"
  ON "clinic_working_hours"("clinic_id", "day_of_week");
CREATE INDEX "clinic_working_hours_clinic_id_is_open_idx"
  ON "clinic_working_hours"("clinic_id", "is_open");

ALTER TABLE "clinic_working_hours"
  ADD CONSTRAINT "clinic_working_hours_clinic_id_fkey"
  FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "bookings"
  ADD COLUMN "specialty_id" TEXT,
  ADD COLUMN "booking_type" "BookingType" NOT NULL DEFAULT 'DOCTOR_CONSULTATION';

UPDATE "bookings"
SET "specialty_id" = "doctors"."specialty_id"
FROM "doctors"
WHERE "bookings"."doctor_id" = "doctors"."id"
  AND "bookings"."specialty_id" IS NULL;

CREATE INDEX "bookings_clinic_id_specialty_id_booking_date_idx"
  ON "bookings"("clinic_id", "specialty_id", "booking_date");
CREATE INDEX "bookings_package_id_booking_date_idx"
  ON "bookings"("package_id", "booking_date");

ALTER TABLE "bookings"
  ADD CONSTRAINT "bookings_specialty_id_fkey"
  FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "health_packages"
  ADD COLUMN "specialty_id" TEXT;

CREATE INDEX "health_packages_specialty_id_is_active_idx"
  ON "health_packages"("specialty_id", "is_active");

ALTER TABLE "health_packages"
  ADD CONSTRAINT "health_packages_specialty_id_fkey"
  FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "package_availabilities" (
  "id" TEXT NOT NULL,
  "package_id" TEXT NOT NULL,
  "day_of_week" SMALLINT NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "start_time" VARCHAR(5) NOT NULL,
  "end_time" VARCHAR(5) NOT NULL,
  "slot_duration_minutes" INTEGER NOT NULL DEFAULT 30,
  "capacity" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL,
  CONSTRAINT "package_availabilities_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "package_availabilities_package_id_day_of_week_key"
  ON "package_availabilities"("package_id", "day_of_week");
CREATE INDEX "package_availabilities_package_id_is_active_idx"
  ON "package_availabilities"("package_id", "is_active");

ALTER TABLE "package_availabilities"
  ADD CONSTRAINT "package_availabilities_package_id_fkey"
  FOREIGN KEY ("package_id") REFERENCES "health_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
