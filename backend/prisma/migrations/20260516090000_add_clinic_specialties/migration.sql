CREATE TABLE "clinic_specialties" (
  "clinic_id" TEXT NOT NULL,
  "specialty_id" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "clinic_specialties_pkey" PRIMARY KEY ("clinic_id", "specialty_id"),
  CONSTRAINT "clinic_specialties_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "clinic_specialties_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "clinic_specialties_specialty_id_idx" ON "clinic_specialties"("specialty_id");

INSERT INTO "clinic_specialties" ("clinic_id", "specialty_id")
SELECT DISTINCT "clinic_id", "specialty_id"
FROM "doctors"
WHERE "clinic_id" IS NOT NULL
  AND "specialty_id" IS NOT NULL;
