import { BookingType, Gender, PrismaClient, UserRole } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const adminPassword = 'Admin@12345';
const clinicPassword = 'Clinic@12345';
const doctorPassword = 'Doctor@12345';
const patientPassword = 'Patient@12345';

const specialtiesSeed = [
  'Nội khoa',
  'Nhi khoa',
  'Răng Hàm Mặt',
  'Da liễu',
  'Mắt',
  'Tai Mũi Họng',
];

const clinicsSeed = [
  {
    key: 'A',
    name: 'Phòng khám An Khang',
    description: 'Phòng khám đa khoa tập trung vào khám tổng quát, nhi khoa và răng hàm mặt.',
    address: '12 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '0281000001',
    email: 'clinicA@healthcare.local',
    website: 'https://ankhang.example',
    specialties: ['Nội khoa', 'Nhi khoa', 'Răng Hàm Mặt'],
  },
  {
    key: 'B',
    name: 'Trung tâm Sức khỏe Bình Minh',
    description: 'Trung tâm chăm sóc sức khỏe gia đình với các chuyên khoa phổ biến.',
    address: '45 Cách Mạng Tháng 8, Quận 3, TP.HCM',
    phone: '0281000002',
    email: 'clinicB@healthcare.local',
    website: 'https://binhminh.example',
    specialties: ['Nội khoa', 'Da liễu', 'Mắt'],
  },
  {
    key: 'C',
    name: 'Phòng khám Gia đình CarePlus',
    description: 'Phòng khám gia đình có thể đặt lịch bác sĩ và gói khám theo chuyên khoa.',
    address: '78 Lê Văn Việt, TP. Thủ Đức, TP.HCM',
    phone: '0281000003',
    email: 'clinicC@healthcare.local',
    website: 'https://careplus.example',
    specialties: ['Nhi khoa', 'Tai Mũi Họng', 'Răng Hàm Mặt'],
  },
];

const imageByClinicKey: Record<string, string> = {
  A: 'https://images.unsplash.com/photo-1519494026892-80bbd2d3fd0d?auto=format&fit=crop&q=80&w=900',
  B: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=900',
  C: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=900',
};

const doctorImages = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1605684954998-685c79d6a018?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&q=80&w=400',
];

function weekdayRows() {
  return [1, 2, 3, 4, 5, 6].map((dayOfWeek) => ({
    dayOfWeek,
    isOpen: true,
    startTime: '08:00',
    endTime: '17:00',
  }));
}

function specialtySchedules(slotDurationMinutes: number, capacity = 1) {
  return [1, 2, 3, 4, 5, 6].flatMap((dayOfWeek) => [
    {
      dayOfWeek,
      isActive: true,
      startTime: '08:00',
      endTime: '11:30',
      slotDurationMinutes,
      capacity,
    },
    {
      dayOfWeek,
      isActive: true,
      startTime: '14:00',
      endTime: '17:00',
      slotDurationMinutes,
      capacity,
    },
  ]);
}

function packageAvailability(slotDurationMinutes: number, capacity = 3) {
  return [1, 2, 3, 4, 5, 6].map((dayOfWeek) => ({
    dayOfWeek,
    isActive: true,
    startTime: '08:00',
    endTime: '11:30',
    slotDurationMinutes,
    capacity,
  }));
}

async function upsertUser(
  prisma: PrismaClient,
  input: {
    email: string;
    password: string;
    role: UserRole;
    name: string;
    phone: string;
  },
) {
  const passwordHash = await bcrypt.hash(input.password, 10);
  return prisma.user.upsert({
    where: { email: input.email },
    update: {
      name: input.name,
      phone: input.phone,
      role: input.role,
      passwordHash,
      emailVerified: true,
      isActive: true,
    },
    create: {
      email: input.email,
      name: input.name,
      phone: input.phone,
      role: input.role,
      passwordHash,
      emailVerified: true,
      isActive: true,
    },
  });
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    await upsertUser(prisma, {
      email: 'admin@gmail.com',
      password: adminPassword,
      role: UserRole.ADMIN,
      name: 'Quản trị hệ thống',
      phone: '0900000000',
    });

    const patient = await upsertUser(prisma, {
      email: 'patient@gmail.com',
      password: patientPassword,
      role: UserRole.PATIENT,
      name: 'Bệnh nhân demo',
      phone: '0900000999',
    });

    const specialties = new Map<string, string>();
    for (const name of specialtiesSeed) {
      const specialty = await prisma.specialty.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      specialties.set(name, specialty.id);
    }

    let doctorIndex = 0;
    for (const clinicSeed of clinicsSeed) {
      const clinic = await prisma.clinic.create({
        data: {
          name: clinicSeed.name,
          description: clinicSeed.description,
          address: clinicSeed.address,
          phone: clinicSeed.phone,
          email: clinicSeed.email,
          website: clinicSeed.website,
          image: imageByClinicKey[clinicSeed.key],
          openingHours: 'Thứ 2 - Thứ 7: 08:00-11:30, 14:00-17:00',
          isOpen: true,
          rating: 4.7,
          reviewCount: 24,
        },
      });

      const clinicAdminUser = await upsertUser(prisma, {
        email: `clinic${clinicSeed.key}@gmail.com`,
        password: clinicPassword,
        role: UserRole.CLINIC_ADMIN,
        name: `Quản lý phòng khám ${clinicSeed.key}`,
        phone: `090000010${clinicSeed.key.charCodeAt(0) - 64}`,
      });

      await prisma.clinicAdmin.create({
        data: { userId: clinicAdminUser.id, clinicId: clinic.id },
      });

      await prisma.clinicWorkingHour.createMany({
        data: weekdayRows().map((row) => ({ ...row, clinicId: clinic.id })),
      });

      for (const specialtyName of clinicSeed.specialties) {
        const specialtyId = specialties.get(specialtyName);
        if (!specialtyId) {
          continue;
        }

        await prisma.clinicSpecialty.create({
          data: { clinicId: clinic.id, specialtyId },
        });

        const slotDurationMinutes =
          specialtyName === 'Răng Hàm Mặt' ? 30 : 60;
        await prisma.clinicSpecialtySchedule.createMany({
          data: specialtySchedules(slotDurationMinutes).map((row) => ({
            ...row,
            clinicId: clinic.id,
            specialtyId,
          })),
        });

        const letter = String.fromCharCode(65 + doctorIndex);
        const doctorUser = await upsertUser(prisma, {
          email: `doctor${letter}@gmail.com`,
          password: doctorPassword,
          role: UserRole.DOCTOR,
          name: `Bác sĩ ${letter}`,
          phone: `09000002${doctorIndex.toString().padStart(2, '0')}`,
        });

        await prisma.doctor.create({
          data: {
            userId: doctorUser.id,
            clinicId: clinic.id,
            specialtyId,
            name: `BS. ${letter}`,
            experience: 5 + doctorIndex,
            avatar: doctorImages[doctorIndex],
            bio: `Bác sĩ phụ trách chuyên khoa ${specialtyName} tại ${clinicSeed.name}.`,
            isAvailable: true,
            qualifications: {
              adminSettings: {
                slotDurationMinutes,
                workingHours: [
                  { dayOfWeek: 1, startTime: '08:00', endTime: '11:30' },
                  { dayOfWeek: 2, startTime: '08:00', endTime: '11:30' },
                  { dayOfWeek: 3, startTime: '14:00', endTime: '17:00' },
                  { dayOfWeek: 4, startTime: '08:00', endTime: '11:30' },
                  { dayOfWeek: 5, startTime: '14:00', endTime: '17:00' },
                ],
                services: [],
              },
            },
          },
        });

        if (doctorIndex % 2 === 0) {
          const healthPackage = await prisma.healthPackage.create({
            data: {
              clinicId: clinic.id,
              specialtyId,
              name: `Gói khám ${specialtyName} - ${clinicSeed.key}`,
              shortDescription: `Gói khám theo chuyên khoa ${specialtyName}.`,
              description: `Gói khám ${specialtyName} tại ${clinicSeed.name}, phù hợp để test booking không cần chọn bác sĩ.`,
              price: 500000 + doctorIndex * 50000,
              promotionalPrice: 450000 + doctorIndex * 50000,
              category: 'clinic_package',
              isActive: true,
              isPopular: doctorIndex < 3,
              features: ['Khám ban đầu', 'Tư vấn kết quả', 'Hướng dẫn theo dõi'],
            },
          });

          await prisma.packageAvailability.createMany({
            data: packageAvailability(slotDurationMinutes, 3).map((row) => ({
              ...row,
              packageId: healthPackage.id,
            })),
          });
        }

        doctorIndex += 1;
      }
    }

    const firstDoctor = await prisma.doctor.findFirst({
      orderBy: { createdAt: 'asc' },
      select: { id: true, clinicId: true, specialtyId: true },
    });
    if (firstDoctor) {
      const bookingDate = new Date();
      bookingDate.setDate(bookingDate.getDate() + 1);
      bookingDate.setHours(0, 0, 0, 0);

      await prisma.booking.create({
        data: {
          userId: patient.id,
          clinicId: firstDoctor.clinicId,
          doctorId: firstDoctor.id,
          specialtyId: firstDoctor.specialtyId,
          bookingType: BookingType.DOCTOR_CONSULTATION,
          patientName: patient.name,
          patientEmail: patient.email,
          patientPhone: patient.phone ?? '0900000999',
          patientGender: Gender.OTHER,
          bookingDate,
          bookingTime: '08:00',
          notes: 'Booking mẫu để doctor admin test xác nhận.',
        },
      });
    }

    const summary = await Promise.all([
      prisma.user.count(),
      prisma.clinic.count(),
      prisma.clinicAdmin.count(),
      prisma.doctor.count(),
      prisma.healthPackage.count(),
      prisma.clinicSpecialtySchedule.count(),
    ]);

    console.log('Seed completed');
    console.log(
      `users=${summary[0]}, clinics=${summary[1]}, clinicAdmins=${summary[2]}, doctors=${summary[3]}, packages=${summary[4]}, specialtySchedules=${summary[5]}`,
    );
    console.log(`ADMIN: admin@gmail.com / ${adminPassword}`);
    console.log(`CLINIC: clinicA@gmail.com / ${clinicPassword}`);
    console.log(`DOCTOR: doctorA@gmail.com / ${doctorPassword}`);
    console.log(`PATIENT: patient@gmail.com / ${patientPassword}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
