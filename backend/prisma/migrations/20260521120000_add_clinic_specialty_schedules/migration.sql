CREATE TABLE IF NOT EXISTS "clinic_specialty_schedules" (
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
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinic_specialty_schedules_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "clinic_specialty_schedules_clinic_id_specialty_id_day_of_week_is_active_idx"
ON "clinic_specialty_schedules"("clinic_id", "specialty_id", "day_of_week", "is_active");

ALTER TABLE "clinic_specialty_schedules"
ADD CONSTRAINT "clinic_specialty_schedules_clinic_id_fkey"
FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "clinic_specialty_schedules"
ADD CONSTRAINT "clinic_specialty_schedules_specialty_id_fkey"
FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "clinic_specialty_schedules"
ADD CONSTRAINT "clinic_specialty_schedules_clinic_id_specialty_id_fkey"
FOREIGN KEY ("clinic_id", "specialty_id") REFERENCES "clinic_specialties"("clinic_id", "specialty_id") ON DELETE CASCADE ON UPDATE CASCADE;
