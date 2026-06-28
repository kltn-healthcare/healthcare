import { PrismaClient as IdentityClient, UserRole } from '../apps/identity/src/generated/client';
import { PrismaClient as AdminClient } from '../apps/admin/src/generated/client';
import { PrismaClient as AppointmentClient } from '../apps/appointment/src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const DEFAULT_PASS = 'Pass@123';

const imageByClinicKey: Record<string, string> = {
  hanhphuc: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900',
  quocte: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=900',
  toanmy: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=900',
};

const doctorImages = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
];

const packageImages = [
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900',
];

const articleImages = [
  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=80&w=900',
];

const clinicsData = [
  {
    key: 'hanhphuc',
    name: 'Phòng khám Hạnh Phúc',
    description: 'Phòng khám chuyên khoa tiêu chuẩn quốc tế.',
    address: '102 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    phone: '0901234567',
    email: 'clinichanhphuc@gmail.com',
    website: 'https://hanhphuc.clinic',
    specialties: ['Nội khoa', 'Nhi khoa'],
    doctors: [
      { name: 'BS Minh Huy', email: 'doctorminhhuy@gmail.com', spec: 'Nội khoa', shortDesc: 'Chuyên gia Nội khoa với 15 năm kinh nghiệm' },
      { name: 'BS Thu Hằng', email: 'doctorthuhang@gmail.com', spec: 'Nhi khoa', shortDesc: 'Bác sĩ Nhi khoa tận tâm' }
    ],
    packageName: 'Gói khám sức khỏe tổng quát Hạnh Phúc',
    packagePrice: 1500000,
    packagePromotional: 1200000,
  },
  {
    key: 'quocte',
    name: 'Phòng khám Đa khoa Quốc tế',
    description: 'Trang thiết bị hiện đại, đội ngũ bác sĩ hàng đầu.',
    address: '45 Lê Duẩn, Quận 1, TP.HCM',
    phone: '0902345678',
    email: 'clinicquocte@gmail.com',
    website: 'https://quocte.clinic',
    specialties: ['Tai Mũi Họng', 'Răng Hàm Mặt'],
    doctors: [
      { name: 'BS Quốc Khánh', email: 'doctorquockhanh@gmail.com', spec: 'Tai Mũi Họng', shortDesc: 'Chuyên gia Tai Mũi Họng' },
      { name: 'BS Tuấn Anh', email: 'doctortuananh@gmail.com', spec: 'Răng Hàm Mặt', shortDesc: 'Bác sĩ Răng Hàm Mặt thẩm mỹ' }
    ],
    packageName: 'Gói khám Tầm soát chuyên sâu Quốc tế',
    packagePrice: 3500000,
    packagePromotional: 3000000,
  },
  {
    key: 'toanmy',
    name: 'Trung tâm Y khoa Toàn Mỹ',
    description: 'Chăm sóc toàn diện, vẻ đẹp hoàn mỹ.',
    address: '78 Nguyễn Thị Minh Khai, Quận 3, TP.HCM',
    phone: '0903456789',
    email: 'clinictoanmy@gmail.com',
    website: 'https://toanmy.clinic',
    specialties: ['Da liễu', 'Mắt'],
    doctors: [
      { name: 'BS Phương Trinh', email: 'doctorphuongtrinh@gmail.com', spec: 'Da liễu', shortDesc: 'Bác sĩ chuyên khoa Da liễu' },
      { name: 'BS Hoàng Long', email: 'doctorhoanglong@gmail.com', spec: 'Mắt', shortDesc: 'Bác sĩ nhãn khoa giàu kinh nghiệm' }
    ],
    packageName: 'Gói khám Tầm soát ung thư Toàn Mỹ',
    packagePrice: 5000000,
    packagePromotional: null,
  }
];

function weekdayRows() {
  return [1, 2, 3, 4, 5, 6, 7].map((dayOfWeek) => ({
    dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek, // Prisma uses 0 for Sunday
    isOpen: true,
    startTime: '08:00',
    endTime: '17:00',
  }));
}

function specialtySchedules(slotDurationMinutes: number, capacity = 1) {
  return [1, 2, 3, 4, 5, 6, 7].flatMap((dayOfWeek) => [
    {
      dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek,
      isActive: true,
      startTime: '08:00',
      endTime: '11:30',
      slotDurationMinutes,
      capacity,
    },
    {
      dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek,
      isActive: true,
      startTime: '14:00',
      endTime: '17:00',
      slotDurationMinutes,
      capacity,
    },
  ]);
}

function packageAvailability(slotDurationMinutes: number, capacity = 3) {
  return [1, 2, 3, 4, 5, 6, 7].map((dayOfWeek) => ({
    dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek,
    isActive: true,
    startTime: '08:00',
    endTime: '17:00',
    slotDurationMinutes,
    capacity,
  }));
}

async function upsertUser(
  prisma: IdentityClient,
  input: {
    email: string;
    role: UserRole;
    name: string;
    phone?: string;
  },
) {
  const passwordHash = await bcrypt.hash(DEFAULT_PASS, 10);
  return prisma.user.upsert({
    where: { email: input.email },
    update: {
      name: input.name,
      phone: input.phone || '0999999999',
      role: input.role,
      passwordHash,
      emailVerified: true,
      isActive: true,
    },
    create: {
      email: input.email,
      name: input.name,
      phone: input.phone || '0999999999',
      role: input.role,
      passwordHash,
      emailVerified: true,
      isActive: true,
    },
  });
}

async function main() {
  const identityUrl = process.env.DATABASE_URL_IDENTITY;
  const adminUrl = process.env.DATABASE_URL_ADMIN;
  const appointmentUrl = process.env.DATABASE_URL_APPOINTMENT;

  if (!identityUrl || !adminUrl || !appointmentUrl) {
    throw new Error('DATABASE_URL_IDENTITY, DATABASE_URL_ADMIN, and DATABASE_URL_APPOINTMENT must be defined');
  }

  const identityPrisma = new IdentityClient({ adapter: new PrismaPg({ connectionString: identityUrl }) });
  const adminPrisma = new AdminClient({ adapter: new PrismaPg({ connectionString: adminUrl }) });
  const appointmentPrisma = new AppointmentClient({ adapter: new PrismaPg({ connectionString: appointmentUrl }) });

  try {
    // 1. Setup Admin & Patient in Identity DB
    await upsertUser(identityPrisma, {
      email: 'admin@gmail.com',
      role: UserRole.ADMIN,
      name: 'Quản trị hệ thống',
      phone: '0900000000',
    });

    const patient = await upsertUser(identityPrisma, {
      email: 'patient@gmail.com',
      role: UserRole.PATIENT,
      name: 'Bệnh nhân Demo',
      phone: '0900000999',
    });

    // 2. Insert Specialties in Admin DB
    const specialties = new Map<string, string>();
    const allSpecialties = ['Nội khoa', 'Nhi khoa', 'Tai Mũi Họng', 'Răng Hàm Mặt', 'Da liễu', 'Mắt'];
    for (const name of allSpecialties) {
      const specialty = await adminPrisma.specialty.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      specialties.set(name, specialty.id);
    }

    // 3. Insert Clinics and Doctors
    let doctorImageIdx = 0;
    let packageImageIdx = 0;

    for (const clinicData of clinicsData) {
      // Upsert Clinic Admin User in Identity DB
      const clinicAdminUser = await upsertUser(identityPrisma, {
        email: clinicData.email,
        role: UserRole.CLINIC_ADMIN,
        name: `Admin ${clinicData.name}`,
      });

      let clinic = await adminPrisma.clinic.findFirst({ where: { email: clinicData.email } });
      
      const clinicPayload = {
          name: clinicData.name,
          description: clinicData.description,
          address: clinicData.address,
          phone: clinicData.phone,
          email: clinicData.email,
          website: clinicData.website,
          image: imageByClinicKey[clinicData.key],
          openingHours: 'Thứ 2 - CN: 08:00-11:30, 14:00-17:00',
          isOpen: true,
          rating: 5.0,
          reviewCount: 15,
      };

      if (clinic) {
        clinic = await adminPrisma.clinic.update({
          where: { id: clinic.id },
          data: clinicPayload,
        });
      } else {
        clinic = await adminPrisma.clinic.create({
          data: {
            ...clinicPayload,
            workingHours: {
              create: weekdayRows(),
            },
          },
        });
      }

      // Create ClinicAdmin in Admin DB
      await adminPrisma.clinicAdmin.upsert({
        where: { userId: clinicAdminUser.id },
        update: { clinicId: clinic.id },
        create: {
          userId: clinicAdminUser.id,
          clinicId: clinic.id,
        }
      });

      // Link Specialties
      for (const specName of clinicData.specialties) {
        const specId = specialties.get(specName);
        if (specId) {
          await adminPrisma.clinicSpecialty.upsert({
            where: {
              clinicId_specialtyId: {
                clinicId: clinic.id,
                specialtyId: specId,
              },
            },
            update: {},
            create: {
              clinicId: clinic.id,
              specialtyId: specId,
              schedules: {
                create: specialtySchedules(30, 2),
              },
            },
          });

          // Find doctor for this specialty
          const docData = clinicData.doctors.find(d => d.spec === specName);
          if (docData) {
            const docUser = await upsertUser(identityPrisma, {
              email: docData.email,
              role: UserRole.DOCTOR,
              name: docData.name,
            });

            const doctor = await adminPrisma.doctor.upsert({
              where: { userId: docUser.id },
              update: {},
              create: {
                userId: docUser.id,
                clinicId: clinic.id,
                specialtyId: specId,
                name: docData.name,
                avatar: doctorImages[doctorImageIdx % doctorImages.length],
                bio: docData.shortDesc,
                experience: 10,
                isAvailable: true,
              },
            });
            doctorImageIdx++;

            // Create fake bookings for Sunday, May 31, 2026 in Appointment DB
            const bookingDate = new Date('2026-05-31T00:00:00.000Z');
            
            await appointmentPrisma.booking.create({
              data: {
                userId: patient.id,
                clinicId: clinic.id,
                doctorId: doctor.id,
                bookingType: 'DOCTOR_CONSULTATION',
                patientName: 'Nguyễn Văn A',
                patientEmail: patient.email,
                patientPhone: '0911222333',
                patientGender: 'MALE',
                bookingDate,
                bookingTime: '08:30',
                status: 'CONFIRMED',
                reason: 'Khám sức khỏe định kỳ',
              }
            });

            await appointmentPrisma.booking.create({
              data: {
                userId: patient.id,
                clinicId: clinic.id,
                doctorId: doctor.id,
                bookingType: 'DOCTOR_CONSULTATION',
                patientName: 'Trần Thị B',
                patientEmail: patient.email,
                patientPhone: '0944555666',
                patientGender: 'FEMALE',
                bookingDate,
                bookingTime: '14:30',
                status: 'PENDING',
                reason: 'Tư vấn dinh dưỡng',
              }
            });
          }
        }
      }

      // Insert Health Package in Admin DB
      let pkg = await adminPrisma.healthPackage.findFirst({ where: { name: clinicData.packageName } });
      const pkgPayload = {
          clinicId: clinic.id,
          name: clinicData.packageName,
          description: `Gói khám tiêu chuẩn của ${clinicData.name}`,
          shortDescription: 'Gói khám nhanh chóng, tiện lợi',
          price: clinicData.packagePrice,
          promotionalPrice: clinicData.packagePromotional,
          imageUrl: packageImages[packageImageIdx % packageImages.length],
          features: ['Khám tổng quát', 'Xét nghiệm máu', 'Siêu âm', 'Tư vấn'],
          isActive: true,
          isPopular: true,
      };

      if (pkg) {
        pkg = await adminPrisma.healthPackage.update({
          where: { id: pkg.id },
          data: pkgPayload,
        });
      } else {
        pkg = await adminPrisma.healthPackage.create({
          data: {
            ...pkgPayload,
            availabilities: {
              create: packageAvailability(60, 5),
            }
          }
        });
      }
      packageImageIdx++;
    }

    // 4. Insert Articles in Admin DB
    const existingArticles = await adminPrisma.article.count();
    if (existingArticles === 0) {
      await adminPrisma.article.createMany({
        data: [
          {
            title: '5 dấu hiệu cảnh báo bạn cần đi khám bác sĩ ngay',
            slug: '5-dau-hieu-canh-bao',
            description: 'Đừng chủ quan với sức khỏe của mình, hãy chú ý các dấu hiệu này.',
            image: articleImages[0],
            category: 'Cẩm nang',
          },
          {
            title: 'Chăm sóc sức khỏe mùa nắng nóng',
            slug: 'cham-soc-suc-khoe-mua-nang',
            description: 'Các biện pháp phòng tránh sốc nhiệt và mất nước.',
            image: articleImages[1],
            category: 'Sức khỏe',
          },
          {
            title: 'Dinh dưỡng hợp lý cho người bệnh tiểu đường',
            slug: 'dinh-duong-cho-nguoi-tieu-duong',
            description: 'Ăn gì và kiêng gì để duy trì đường huyết ổn định.',
            image: articleImages[2],
            category: 'Dinh dưỡng',
          },
          {
            title: 'Hướng dẫn chuẩn bị trước khi khám tổng quát',
            slug: 'huong-dan-kham-tong-quat',
            description: 'Những điều cần lưu ý để kết quả khám chính xác nhất.',
            image: articleImages[3],
            category: 'Cẩm nang',
          }
        ]
      });
    }

    console.log('Production Data Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await identityPrisma.$disconnect();
    await adminPrisma.$disconnect();
    await appointmentPrisma.$disconnect();
  }
}

main();
