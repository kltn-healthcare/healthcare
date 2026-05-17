import { PrismaClient, UserRole } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not defined in .env');

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  console.log('--- Seeding Demo Data ---');

  // 1. Create Specialties
  const specialtiesData = [
    { name: 'Nội khoa' },
    { name: 'Nhi khoa' },
    { name: 'Răng Hàm Mặt' },
    { name: 'Da liễu' },
    { name: 'Nhãn khoa' },
    { name: 'Tai Mũi Họng' },
  ];

  for (const s of specialtiesData) {
    await prisma.specialty.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }
  const allSpecialties = await prisma.specialty.findMany();
  console.log(`Seeded ${allSpecialties.length} specialties.`);

  // 2. Create Clinics
  const clinicsData = [
    {
      name: 'Phòng Khám Đa Khoa An Khang',
      description: 'Phòng khám chất lượng cao với đội ngũ bác sĩ giàu kinh nghiệm',
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
      phone: '028-1234-5678',
      email: 'contact@ankhang.vn',
      rating: 4.8,
      reviewCount: 256,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d3fd0d?auto=format&fit=crop&q=80&w=800',
      isOpen: true,
      openingHours: 'T2-T7: 8:00 - 20:00',
    },
    {
      name: 'Nha Khoa Thành Phố',
      description: 'Chuyên khoa nha khoa với trang thiết bị hiện đại',
      address: '456 Đường Nguyễn Huệ, Quận 3, TP.HCM',
      phone: '028-2345-6789',
      email: 'contact@nhakhoatp.vn',
      rating: 4.6,
      reviewCount: 189,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      isOpen: true,
      openingHours: 'T2-CN: 8:00 - 21:00',
    },
    {
      name: 'Phòng Khám Gia Đình',
      description: 'Chăm sóc sức khỏe toàn diện cho cả gia đình',
      address: '789 Đường Võ Văn Tần, Quận 5, TP.HCM',
      phone: '028-3456-7890',
      email: 'contact@giadinh.vn',
      rating: 4.9,
      reviewCount: 312,
      image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
      isOpen: true,
      openingHours: 'T2-T6: 7:00 - 19:00',
    },
  ];

  for (const c of clinicsData) {
    await prisma.clinic.upsert({
      where: { id: c.name }, // This won't work for unique name if id is uuid. I'll search by name first.
      update: c,
      create: c,
    }).catch(async () => {
        const existing = await prisma.clinic.findFirst({ where: { name: c.name } });
        if (!existing) await prisma.clinic.create({ data: c });
        else await prisma.clinic.update({ where: { id: existing.id }, data: c });
    });
  }
  const allClinics = await prisma.clinic.findMany();
  const clinicByName = new Map(allClinics.map((clinic) => [clinic.name, clinic]));
  const specialtyByName = new Map(
    allSpecialties.map((specialty) => [specialty.name, specialty]),
  );
  console.log(`Seeded ${allClinics.length} clinics.`);

  const clinicSpecialtiesData = [
    {
      clinicName: clinicsData[0].name,
      specialtyNames: [
        specialtiesData[0].name,
        specialtiesData[1].name,
        specialtiesData[3].name,
        specialtiesData[4].name,
        specialtiesData[5].name,
      ],
    },
    {
      clinicName: clinicsData[1].name,
      specialtyNames: [specialtiesData[2].name],
    },
    {
      clinicName: clinicsData[2].name,
      specialtyNames: [
        specialtiesData[0].name,
        specialtiesData[1].name,
        specialtiesData[3].name,
      ],
    },
  ];

  for (const item of clinicSpecialtiesData) {
    const clinic = clinicByName.get(item.clinicName);

    if (!clinic) continue;

    for (const specialtyName of item.specialtyNames) {
      const specialty = specialtyByName.get(specialtyName);

      if (!specialty) continue;

      await prisma.clinicSpecialty.upsert({
        where: {
          clinicId_specialtyId: {
            clinicId: clinic.id,
            specialtyId: specialty.id,
          },
        },
        update: {},
        create: {
          clinicId: clinic.id,
          specialtyId: specialty.id,
        },
      });
    }
  }
  console.log('Seeded clinic-specialty mappings.');

  // 3. Create Doctors
  const doctorsData = [
    {
      name: 'BS. Lê Văn Phú',
      experience: 15,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      bio: 'Chuyên gia nội khoa với hơn 15 năm kinh nghiệm.',
      clinicId: clinicByName.get(clinicsData[0].name)!.id,
      specialtyId: specialtyByName.get(specialtiesData[0].name)!.id,
    },
    {
      name: 'BS. Nguyễn Thị Mai',
      experience: 10,
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
      bio: 'Bác sĩ nhi khoa tâm huyết.',
      clinicId: clinicByName.get(clinicsData[0].name)!.id,
      specialtyId: specialtyByName.get(specialtiesData[1].name)!.id,
    },
    {
      name: 'BS. Trần Hoàng Nam',
      experience: 12,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      bio: 'Chuyên gia phục hình răng sứ.',
      clinicId: clinicByName.get(clinicsData[1].name)!.id,
      specialtyId: specialtyByName.get(specialtiesData[2].name)!.id,
    },
  ];

  for (const d of doctorsData) {
    const existing = await prisma.doctor.findFirst({ where: { name: d.name } });
    if (!existing) await prisma.doctor.create({ data: d });
    else await prisma.doctor.update({ where: { id: existing.id }, data: d });
  }
  console.log(`Seeded ${doctorsData.length} doctors.`);

  console.log('--- Demo Data Seeding Completed ---');
  await prisma.$disconnect();
}

main().catch(console.error);
