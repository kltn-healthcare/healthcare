/*
  Warnings:

  - You are about to drop the `articles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booking_reminder_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_specialties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_specialty_schedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_working_hours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `health_packages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_availabilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking_reminder_logs" DROP CONSTRAINT "booking_reminder_logs_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_package_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_specialty_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_admins" DROP CONSTRAINT "clinic_admins_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_admins" DROP CONSTRAINT "clinic_admins_user_id_fkey";

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
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_user_id_fkey";

-- DropForeignKey
ALTER TABLE "health_packages" DROP CONSTRAINT "health_packages_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "health_packages" DROP CONSTRAINT "health_packages_specialty_id_fkey";

-- DropForeignKey
ALTER TABLE "package_availabilities" DROP CONSTRAINT "package_availabilities_package_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- DropTable
DROP TABLE "articles";

-- DropTable
DROP TABLE "booking_reminder_logs";

-- DropTable
DROP TABLE "bookings";

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
DROP TABLE "reviews";

-- DropTable
DROP TABLE "specialties";

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "BookingType";

-- DropEnum
DROP TYPE "ReminderChannel";

-- DropEnum
DROP TYPE "ReminderStatus";

-- DropEnum
DROP TYPE "ReminderType";
