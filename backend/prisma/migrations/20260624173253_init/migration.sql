/*
  Warnings:

  - You are about to drop the `articles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_specialties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_specialty_schedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_working_hours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `health_packages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_availabilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('DOCTOR', 'PACKAGE');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "clinic_admins" DROP CONSTRAINT "clinic_admins_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_specialties" DROP CONSTRAINT "clinic_specialties_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_specialties" DROP CONSTRAINT "clinic_specialties_specialty_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_specialty_schedules" DROP CONSTRAINT "clinic_specialty_schedules_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_specialty_schedules" DROP CONSTRAINT "clinic_specialty_schedules_clinic_id_specialty_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_specialty_schedules" DROP CONSTRAINT "clinic_specialty_schedules_specialty_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_working_hours" DROP CONSTRAINT "clinic_working_hours_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_specialty_id_fkey";

-- DropForeignKey
ALTER TABLE "health_packages" DROP CONSTRAINT "health_packages_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "health_packages" DROP CONSTRAINT "health_packages_specialty_id_fkey";

-- DropForeignKey
ALTER TABLE "package_availabilities" DROP CONSTRAINT "package_availabilities_package_id_fkey";

-- DropTable
DROP TABLE "articles";

-- DropTable
DROP TABLE "clinic_admins";

-- DropTable
DROP TABLE "clinic_specialties";

-- DropTable
DROP TABLE "clinic_specialty_schedules";

-- DropTable
DROP TABLE "clinic_working_hours";

-- DropTable
DROP TABLE "clinics";

-- DropTable
DROP TABLE "doctors";

-- DropTable
DROP TABLE "health_packages";

-- DropTable
DROP TABLE "package_availabilities";

-- DropTable
DROP TABLE "specialties";

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "booking_number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "doctor_id" TEXT,
    "clinic_id" TEXT NOT NULL,
    "type" "BookingType" NOT NULL,
    "scheduled_date" DATE NOT NULL,
    "time_slot" VARCHAR(5) NOT NULL,
    "patient_name" TEXT NOT NULL,
    "patient_phone" TEXT NOT NULL,
    "patient_email" TEXT NOT NULL,
    "patient_gender" "Gender",
    "patient_dob" DATE,
    "reason" TEXT NOT NULL,
    "symptoms" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "payment_id" TEXT,
    "payment_amount" DECIMAL(12,2),
    "payment_url" TEXT,
    "checkout_session_id" TEXT,
    "payment_method" VARCHAR(50),
    "payment_info" JSONB,
    "canceled_by" VARCHAR(50),
    "cancel_reason" TEXT,
    "notes" TEXT,
    "clinic_notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_reminder_logs" (
    "id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "reminder_type" TEXT NOT NULL,
    "sent_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_reminder_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "doctor_id" TEXT,
    "clinic_id" TEXT,
    "booking_id" TEXT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "reply_comment" TEXT,
    "reply_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookings_booking_number_key" ON "bookings"("booking_number");

-- CreateIndex
CREATE INDEX "bookings_user_id_idx" ON "bookings"("user_id");

-- CreateIndex
CREATE INDEX "bookings_doctor_id_idx" ON "bookings"("doctor_id");

-- CreateIndex
CREATE INDEX "bookings_clinic_id_idx" ON "bookings"("clinic_id");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_scheduled_date_idx" ON "bookings"("scheduled_date");

-- CreateIndex
CREATE INDEX "bookings_booking_number_idx" ON "bookings"("booking_number");

-- CreateIndex
CREATE INDEX "bookings_created_at_idx" ON "bookings"("created_at");

-- CreateIndex
CREATE INDEX "booking_reminder_logs_booking_id_idx" ON "booking_reminder_logs"("booking_id");

-- CreateIndex
CREATE INDEX "booking_reminder_logs_sent_at_idx" ON "booking_reminder_logs"("sent_at");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_booking_id_key" ON "reviews"("booking_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- CreateIndex
CREATE INDEX "reviews_doctor_id_idx" ON "reviews"("doctor_id");

-- CreateIndex
CREATE INDEX "reviews_clinic_id_idx" ON "reviews"("clinic_id");

-- AddForeignKey
ALTER TABLE "booking_reminder_logs" ADD CONSTRAINT "booking_reminder_logs_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
