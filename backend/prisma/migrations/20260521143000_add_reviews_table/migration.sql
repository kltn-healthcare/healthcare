CREATE TABLE IF NOT EXISTS "reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "doctor_id" TEXT,
    "clinic_id" TEXT,
    "booking_id" TEXT,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "reviews_booking_id_key" ON "reviews"("booking_id");
CREATE INDEX IF NOT EXISTS "reviews_doctor_id_created_at_idx" ON "reviews"("doctor_id", "created_at");
CREATE INDEX IF NOT EXISTS "reviews_clinic_id_created_at_idx" ON "reviews"("clinic_id", "created_at");
CREATE INDEX IF NOT EXISTS "reviews_user_id_idx" ON "reviews"("user_id");

ALTER TABLE "reviews"
ADD CONSTRAINT "reviews_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "reviews"
ADD CONSTRAINT "reviews_doctor_id_fkey"
FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "reviews"
ADD CONSTRAINT "reviews_clinic_id_fkey"
FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "reviews"
ADD CONSTRAINT "reviews_booking_id_fkey"
FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
