CREATE TABLE "health_packages" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "short_description" TEXT,
  "description" TEXT NOT NULL,
  "price" DECIMAL(12, 2) NOT NULL,
  "promotional_price" DECIMAL(12, 2),
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
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL,

  CONSTRAINT "health_packages_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "health_packages_category_is_active_idx" ON "health_packages"("category", "is_active");
CREATE INDEX "health_packages_clinic_id_is_active_idx" ON "health_packages"("clinic_id", "is_active");

ALTER TABLE "health_packages"
  ADD CONSTRAINT "health_packages_clinic_id_fkey"
  FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "bookings" ADD COLUMN "package_id" TEXT;

ALTER TABLE "bookings"
  ADD CONSTRAINT "bookings_package_id_fkey"
  FOREIGN KEY ("package_id") REFERENCES "health_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
