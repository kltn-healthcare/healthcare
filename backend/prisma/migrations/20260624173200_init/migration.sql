/*
  Warnings:

  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_device_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_device_tokens" DROP CONSTRAINT "user_device_tokens_user_id_fkey";

-- DropTable
DROP TABLE "notifications";

-- DropTable
DROP TABLE "user_device_tokens";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "clinics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "website" TEXT,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0.0,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "is_open" BOOLEAN NOT NULL DEFAULT true,
    "opening_hours" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "bank_info" TEXT,
    "deposit_amount" INTEGER NOT NULL DEFAULT 100000,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinic_admins" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "clinic_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinic_specialties" (
    "clinic_id" TEXT NOT NULL,
    "specialty_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinic_specialties_pkey" PRIMARY KEY ("clinic_id","specialty_id")
);

-- CreateTable
CREATE TABLE "clinic_specialty_schedules" (
    "id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    "specialty_id" TEXT NOT NULL,
    "day_of_week" SMALLINT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_time" VARCHAR(5) NOT NULL,
    "end_time" VARCHAR(5) NOT NULL,
    "slot_duration_minutes" INTEGER NOT NULL DEFAULT 30,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "clinic_specialty_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "clinic_id" TEXT NOT NULL,
    "specialty_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qualifications" JSONB,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT,
    "bio" TEXT,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_description" TEXT,
    "description" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "promotional_price" DECIMAL(12,2),
    "currency" TEXT NOT NULL DEFAULT 'VND',
    "category" TEXT NOT NULL DEFAULT 'basic',
    "target_gender" TEXT,
    "target_age_range" TEXT,
    "preparation_notes" TEXT,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "features" TEXT[],
    "image_url" TEXT,
    "clinic_id" TEXT,
    "specialty_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "health_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Cẩm nang',
    "read_time" TEXT NOT NULL DEFAULT '5 phút',
    "published_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clinics_is_open_rating_idx" ON "clinics"("is_open", "rating");

-- CreateIndex
CREATE INDEX "clinics_created_at_idx" ON "clinics"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "clinic_admins_user_id_key" ON "clinic_admins"("user_id");

-- CreateIndex
CREATE INDEX "clinic_admins_clinic_id_idx" ON "clinic_admins"("clinic_id");

-- CreateIndex
CREATE INDEX "clinic_working_hours_clinic_id_is_open_idx" ON "clinic_working_hours"("clinic_id", "is_open");

-- CreateIndex
CREATE UNIQUE INDEX "clinic_working_hours_clinic_id_day_of_week_key" ON "clinic_working_hours"("clinic_id", "day_of_week");

-- CreateIndex
CREATE UNIQUE INDEX "specialties_name_key" ON "specialties"("name");

-- CreateIndex
CREATE INDEX "clinic_specialties_specialty_id_idx" ON "clinic_specialties"("specialty_id");

-- CreateIndex
CREATE INDEX "clinic_specialty_schedules_clinic_id_specialty_id_day_of_we_idx" ON "clinic_specialty_schedules"("clinic_id", "specialty_id", "day_of_week", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_id_key" ON "doctors"("user_id");

-- CreateIndex
CREATE INDEX "doctors_clinic_id_specialty_id_idx" ON "doctors"("clinic_id", "specialty_id");

-- CreateIndex
CREATE INDEX "health_packages_category_is_active_idx" ON "health_packages"("category", "is_active");

-- CreateIndex
CREATE INDEX "health_packages_clinic_id_is_active_idx" ON "health_packages"("clinic_id", "is_active");

-- CreateIndex
CREATE INDEX "health_packages_specialty_id_is_active_idx" ON "health_packages"("specialty_id", "is_active");

-- CreateIndex
CREATE INDEX "package_availabilities_package_id_is_active_idx" ON "package_availabilities"("package_id", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "package_availabilities_package_id_day_of_week_key" ON "package_availabilities"("package_id", "day_of_week");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_published_at_idx" ON "articles"("published_at");

-- CreateIndex
CREATE INDEX "articles_category_idx" ON "articles"("category");

-- AddForeignKey
ALTER TABLE "clinic_admins" ADD CONSTRAINT "clinic_admins_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_working_hours" ADD CONSTRAINT "clinic_working_hours_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_specialties" ADD CONSTRAINT "clinic_specialties_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_specialties" ADD CONSTRAINT "clinic_specialties_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_specialty_schedules" ADD CONSTRAINT "clinic_specialty_schedules_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_specialty_schedules" ADD CONSTRAINT "clinic_specialty_schedules_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_specialty_schedules" ADD CONSTRAINT "clinic_specialty_schedules_clinic_id_specialty_id_fkey" FOREIGN KEY ("clinic_id", "specialty_id") REFERENCES "clinic_specialties"("clinic_id", "specialty_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_packages" ADD CONSTRAINT "health_packages_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_packages" ADD CONSTRAINT "health_packages_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_availabilities" ADD CONSTRAINT "package_availabilities_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "health_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
