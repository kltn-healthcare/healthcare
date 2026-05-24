-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "payment_receipt_url" TEXT;

-- AlterTable
ALTER TABLE "clinic_specialty_schedules" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "clinics" ADD COLUMN     "bank_info" TEXT,
ADD COLUMN     "deposit_amount" INTEGER NOT NULL DEFAULT 100000;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "updated_at" DROP DEFAULT;

-- RenameIndex
ALTER INDEX "clinic_specialty_schedules_clinic_id_specialty_id_day_of_week_i" RENAME TO "clinic_specialty_schedules_clinic_id_specialty_id_day_of_we_idx";
