import { PrismaClient as IdentityClient, UserRole } from '../apps/identity/src/generated/client';
import { PrismaClient as AdminClient } from '../apps/admin/src/generated/client';
import { PrismaClient as AppointmentClient, BookingType, BookingStatus, Gender } from '../apps/appointment/src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const DEFAULT_PASS = process.env.DEMO_SEED_PASSWORD || 'Pass@123';

type ClinicSeed = {
  key: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  openingHours: string;
  specialties: Array<{ name: string; slotDuration: number; capacity: number }>;
  doctors: Array<{
    name: string;
    email: string;
    phone: string;
    specialty: string;
    bio: string;
    experience: number;
    qualifications: string[];
  }>;
  packages: Array<{
    name: string;
    shortDescription: string;
    description: string;
    category: string;
    price: number;
    promotionalPrice?: number;
    targetGender?: string;
    targetAgeRange?: string;
    features: string[];
    preparationNotes?: string;
    specialty?: string;
  }>;
};

const clinicImageByKey: Record<string, string> = {
  tamduc: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=1200',
  anhduong: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200',
  saigoncare: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const clinicSeeds: ClinicSeed[] = [
  {
    key: 'tamduc',
    name: 'Phòng khám Đa khoa Tâm Đức',
    description: 'Đặt lịch nhanh, quy trình khám gọn, có dashboard quản trị đầy đủ.',
    address: '215 Lý Thường Kiệt, Quận 11, TP.HCM',
    phone: '02873001122',
    email: 'tamduc.admin@demo.healthcare.vn',
    website: 'https://tamduc.demo.healthcare.vn',
    openingHours: 'Thứ 2 - Chủ nhật: 07:30-11:30, 13:30-20:00',
    specialties: [
      { name: 'Nội tổng quát', slotDuration: 20, capacity: 3 },
      { name: 'Tim mạch', slotDuration: 30, capacity: 2 },
      { name: 'Nhi khoa', slotDuration: 20, capacity: 2 },
    ],
    doctors: [
      {
        name: 'BS.CKII Lê Minh Anh',
        email: 'doctor.minhanh@demo.healthcare.vn',
        phone: '0901200001',
        specialty: 'Nội tổng quát',
        bio: 'BS.CKII Lê Minh Anh có hơn 14 năm kinh nghiệm Nội khoa tổng quát tại các bệnh viện tuyến đầu. Bác sĩ có thế mạnh chuyên sâu trong chẩn đoán, điều trị và quản lý các bệnh lý mạn tính và đường tiêu hóa. Với tôn chỉ "Chăm sóc bằng cả trái tim", bác sĩ luôn tận tâm lắng nghe, mang lại phác đồ điều trị tối ưu và phù hợp nhất cho từng bệnh nhân.',
        experience: 14,
        qualifications: ['BS.CKII Nội tổng quát - ĐH Y Dược TP.HCM', 'Chứng chỉ quản lý bệnh mạn tính Hoa Kỳ', 'Hội viên Hội Nội khoa Việt Nam'],
      },
      {
        name: 'BS Nguyễn Hoàng Phúc',
        email: 'doctor.hoangphuc@demo.healthcare.vn',
        phone: '0901200002',
        specialty: 'Tim mạch',
        bio: 'Bác sĩ Nguyễn Hoàng Phúc là một chuyên gia tận tụy trong lĩnh vực Tim mạch với hơn 11 năm kinh nghiệm lâm sàng. Bác sĩ chuyên sâu về chẩn đoán và điều trị nội khoa các bệnh lý tim mạch phổ biến như bệnh tim thiếu máu cục bộ, suy tim, rối loạn nhịp tim, và đặc biệt là kiểm soát các yếu tố nguy cơ tim mạch.\n\nBác sĩ Phúc sở hữu các chứng chỉ chuyên sâu về siêu âm tim, điện tâm đồ gắng sức và luôn cập nhật những tiến bộ y khoa mới nhất nhằm đưa ra phương án điều trị tối ưu, an toàn, giúp cải thiện chất lượng cuộc sống lâu dài cho người bệnh.',
        experience: 11,
        qualifications: ['Bác sĩ Chuyên khoa Tim mạch - ĐH Y Hà Nội', 'Chứng chỉ siêu âm tim nâng cao - Viện Tim TP.HCM', 'Thành viên Hội Tim mạch học Quốc gia'],
      },
      {
        name: 'BS Trần Thu Hà',
        email: 'doctor.thuha@demo.healthcare.vn',
        phone: '0901200003',
        specialty: 'Nhi khoa',
        bio: 'Với hơn 9 năm gắn bó với chuyên khoa Nhi, bác sĩ Trần Thu Hà được đông đảo phụ huynh tin yêu nhờ phong cách thăm khám nhẹ nhàng, gần gũi và thấu hiểu tâm lý trẻ nhỏ. Bác sĩ chuyên điều trị các bệnh lý hô hấp, tiêu hóa, tai mũi họng trẻ em và theo dõi sự phát triển thể chất toàn diện.\n\nBác sĩ Hà cũng là chuyên gia tư vấn dinh dưỡng nhi khoa, giúp cha mẹ thiết lập chế độ ăn uống khoa học, tăng cường sức đề kháng tự nhiên cho bé và xử lý các vấn đề biếng ăn, chậm tăng cân một cách hiệu quả.',
        experience: 9,
        qualifications: ['Bác sĩ chuyên khoa Nhi - ĐH Y Dược TP.HCM', 'Chứng chỉ Dinh dưỡng Lâm sàng Nhi khoa', 'Chứng chỉ xử trí lồng ruột & cấp cứu nhi'],
      },
    ],
    packages: [
      {
        name: 'Gói khám sức khỏe tổng quát doanh nghiệp Tâm Đức',
        shortDescription: 'Khám tổng quát 1 buổi, có kết quả trong ngày.',
        description: 'Gói tầm soát toàn diện cho người đi làm.',
        category: 'general',
        price: 1590000,
        promotionalPrice: 1290000,
        targetGender: 'ALL',
        targetAgeRange: '22-60',
        features: ['Khám nội tổng quát', 'Tổng phân tích máu', 'X-quang phổi', 'Điện tim ECG'],
        preparationNotes: 'Nhịn ăn tối thiểu 8 tiếng trước khi lấy máu.',
        specialty: 'Nội tổng quát',
      },
      {
        name: 'Gói tầm soát tim mạch chuyên sâu Tâm Đức',
        shortDescription: 'Đánh giá nguy cơ tim mạch cá nhân hóa.',
        description: 'Dành cho người có tiền sử bệnh tim, huyết áp, mỡ máu cao.',
        category: 'cardio',
        price: 2490000,
        promotionalPrice: 2190000,
        targetGender: 'ALL',
        targetAgeRange: '35-70',
        features: ['Khám tim mạch', 'Siêu âm tim', 'Điện tim gắng sức', 'Men tim cơ bản'],
        preparationNotes: 'Mang theo toa thuốc đang sử dụng.',
        specialty: 'Tim mạch',
      },
    ],
  },
  {
    key: 'anhduong',
    name: 'Phòng khám Chuyên khoa Ánh Dương',
    description: 'Mạnh về sản phụ khoa và da liễu, có khung giờ ngoài hành chính.',
    address: '68 Nguyễn Văn Trỗi, Quận Phú Nhuận, TP.HCM',
    phone: '02873003344',
    email: 'anhduong.admin@demo.healthcare.vn',
    website: 'https://anhduong.demo.healthcare.vn',
    openingHours: 'Thứ 2 - Thứ 7: 08:00-12:00, 14:00-21:00',
    specialties: [
      { name: 'Sản phụ khoa', slotDuration: 30, capacity: 2 },
      { name: 'Da liễu', slotDuration: 20, capacity: 3 },
    ],
    doctors: [
      {
        name: 'BS.CKII Vũ Khánh Linh',
        email: 'doctor.khanhlinh@demo.healthcare.vn',
        phone: '0902300001',
        specialty: 'Sản phụ khoa',
        bio: 'Bác sĩ CKII Vũ Khánh Linh đã có hơn 13 năm kinh nghiệm trong việc chăm sóc sức khỏe sinh sản phụ nữ và quản lý thai kỳ. Bác sĩ chuyên thực hiện các kỹ thuật siêu âm sản phụ khoa chất lượng cao, tầm soát sớm các dị tật thai nhi và phát hiện sớm các bệnh lý phụ khoa nguy hiểm.\n\nBác sĩ Linh luôn đồng hành chia sẻ cùng các thai phụ bằng sự ân cần, giúp các mẹ bầu yên tâm trong suốt hành trình vượt cạn thiêng liêng.',
        experience: 13,
        qualifications: ['BS.CKII Sản Phụ Khoa - ĐH Y Dược Hải Phòng', 'Chứng chỉ chẩn đoán hình ảnh sản khoa nâng cao', 'Thành viên Hội Phụ sản Việt Nam'],
      },
      {
        name: 'BS Lâm Quang Nhật',
        email: 'doctor.quangnhat@demo.healthcare.vn',
        phone: '0902300002',
        specialty: 'Da liễu',
        bio: 'Bác sĩ Lâm Quang Nhật là một chuyên gia trẻ năng động với hơn 8 năm kinh nghiệm trong chuyên ngành Da liễu và thẩm mỹ da y khoa. Bác sĩ chuyên điều trị dứt điểm các tình trạng mụn trứng cá nặng, viêm da cơ địa, chàm, vảy nến và phục hồi làn da bị tổn thương do mỹ phẩm kém chất lượng.\n\nBác sĩ Nhật ứng dụng các công nghệ laser hiện đại kết hợp dược mỹ phẩm chuẩn y khoa để mang lại làn da khỏe đẹp, tự tin nhất cho từng khách hàng.',
        experience: 8,
        qualifications: ['Bác sĩ Da liễu - ĐH Y khoa Phạm Ngọc Thạch', 'Chứng chỉ Laser và ánh sáng trong da liễu', 'Chứng chỉ thủ thuật thẩm mỹ nội khoa'],
      },
    ],
    packages: [
      {
        name: 'Gói khám phụ khoa định kỳ Ánh Dương',
        shortDescription: 'Khám định kỳ cho nữ giới.',
        description: 'Gói khám theo khuyến nghị 6-12 tháng/lần.',
        category: 'women',
        price: 1390000,
        promotionalPrice: 1090000,
        targetGender: 'FEMALE',
        targetAgeRange: '18-55',
        features: ['Khám phụ khoa', 'Soi tươi dịch âm đạo', 'Siêu âm tử cung-buồng trứng'],
        preparationNotes: 'Không khám trong ngày hành kinh.',
        specialty: 'Sản phụ khoa',
      },
      {
        name: 'Gói chăm sóc da y khoa Ánh Dương',
        shortDescription: 'Đánh giá da và lập lộ trình điều trị.',
        description: 'Phù hợp người bị mụn, nám, viêm da kéo dài.',
        category: 'dermatology',
        price: 1190000,
        promotionalPrice: 990000,
        targetGender: 'ALL',
        targetAgeRange: '16-60',
        features: ['Khám da liễu', 'Soi da kỹ thuật số', 'Lập phác đồ 8-12 tuần'],
        specialty: 'Da liễu',
      },
    ],
  },
  {
    key: 'saigoncare',
    name: 'Trung tâm Y khoa Sài Gòn Care',
    description: 'Tập trung cơ xương khớp và phục hồi chức năng.',
    address: '102 Điện Biên Phủ, Quận 1, TP.HCM',
    phone: '02873005566',
    email: 'saigoncare.admin@demo.healthcare.vn',
    website: 'https://saigoncare.demo.healthcare.vn',
    openingHours: 'Thứ 2 - Chủ nhật: 07:00-12:00, 13:00-19:00',
    specialties: [
      { name: 'Cơ xương khớp', slotDuration: 30, capacity: 2 },
      { name: 'Vật lý trị liệu', slotDuration: 45, capacity: 2 },
    ],
    doctors: [
      {
        name: 'BS Phạm Đức Thành',
        email: 'doctor.ducthanh@demo.healthcare.vn',
        phone: '0903300001',
        specialty: 'Cơ xương khớp',
        bio: 'Bác sĩ Phạm Đức Thành có 12 năm kinh nghiệm chẩn đoán và điều trị các bệnh lý cơ xương khớp mạn tính, thoái hóa cột sống, thoát vị đĩa đệm và điều trị chấn thương thể thao.\n\nBác sĩ áp dụng các phương pháp y học hiện đại kết hợp các thủ thuật giảm đau tại chỗ ít xâm lấn, giúp khôi phục biên độ vận động nhanh chóng cho người bệnh mà không lạm dụng thuốc kháng viêm.',
        experience: 12,
        qualifications: ['Bác sĩ chuyên khoa Cơ xương khớp - ĐH Y Dược TP.HCM', 'Chứng chỉ tiêm khớp dưới hướng dẫn siêu âm', 'Thành viên Hội Thấp khớp học Việt Nam'],
      },
      {
        name: 'ThS.BS Đặng Ngọc Mai',
        email: 'doctor.ngocmai@demo.healthcare.vn',
        phone: '0903300002',
        specialty: 'Vật lý trị liệu',
        bio: 'Thạc sĩ Bác sĩ Đặng Ngọc Mai là chuyên gia hàng đầu về Phục hồi chức năng và Vật lý trị liệu với hơn 10 năm kinh nghiệm. Bác sĩ chuyên thiết kế các chương trình tập luyện cá nhân hóa hỗ trợ phục hồi sau tai biến mạch máu não, phục hồi sau phẫu thuật xương khớp lớn và điều chỉnh tư thế cột sống.\n\nBác sĩ Mai luôn kiên trì động viên và đồng hành sát sao cùng người bệnh trên con đường tìm lại khả năng vận động tự nhiên.',
        experience: 10,
        qualifications: ['Thạc sĩ Phục hồi Chức năng - ĐH Y Dược TP.HCM', 'Chứng chỉ Vật lý trị liệu nâng cao quốc tế', 'Thành viên Hội Phục hồi Chức năng Việt Nam'],
      },
    ],
    packages: [
      {
        name: 'Gói tầm soát cơ xương khớp Sài Gòn Care',
        shortDescription: 'Đánh giá sớm nguy cơ thoái hóa và đau mạn tính.',
        description: 'Phù hợp nhân sự văn phòng ít vận động.',
        category: 'musculoskeletal',
        price: 1790000,
        promotionalPrice: 1490000,
        targetGender: 'ALL',
        targetAgeRange: '25-65',
        features: ['Khám cơ xương khớp', 'Đánh giá tư thế', 'Siêu âm khớp cơ bản'],
        specialty: 'Cơ xương khớp',
      },
    ],
  },
];

const patientSeeds = [
  { name: 'Nguyễn Văn An', email: 'patient.an@demo.healthcare.vn', phone: '0911000001', gender: Gender.MALE, dob: new Date('1996-04-12') },
  { name: 'Trần Thị Bình', email: 'patient.binh@demo.healthcare.vn', phone: '0911000002', gender: Gender.FEMALE, dob: new Date('1999-08-21') },
  { name: 'Lê Minh Châu', email: 'patient.chau@demo.healthcare.vn', phone: '0911000003', gender: Gender.FEMALE, dob: new Date('1988-11-05') },
  { name: 'Phạm Minh Đức', email: 'patient.duc@demo.healthcare.vn', phone: '0911000004', gender: Gender.MALE, dob: new Date('1992-03-15') },
  { name: 'Hoàng Ngọc Vy', email: 'patient.vy@demo.healthcare.vn', phone: '0911000005', gender: Gender.FEMALE, dob: new Date('1995-07-29') },
  { name: 'Nguyễn Hoàng Nam', email: 'patient.nam@demo.healthcare.vn', phone: '0911000006', gender: Gender.MALE, dob: new Date('1985-05-18') },
];

const articleSeeds = [
  {
    title: 'Cách đặt lịch khám online nhanh và đúng giờ',
    slug: 'demo-cach-dat-lich-kham-online',
    description: 'Đặt lịch trước giúp bạn chủ động chọn khung giờ, giảm thời gian chờ và tránh bỏ lỡ lịch hẹn.\n\nTrước khi đặt, hãy chuẩn bị sẵn họ tên, số điện thoại, nhu cầu khám và chuyên khoa mong muốn để thao tác nhanh hơn.\n\nSau khi xác nhận lịch, nên đến sớm 10-15 phút và mang theo giấy tờ tùy thân để quầy tiếp nhận xử lý thuận tiện.',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=1200',
    category: 'Cẩm nang',
  },
  {
    title: '5 thói quen giúp bảo vệ tim mạch cho dân văn phòng',
    slug: 'demo-5-thoi-quen-bao-ve-tim-mach',
    description: 'Ngồi lâu và ít vận động là hai yếu tố làm tăng nguy cơ tim mạch ở người làm văn phòng.\n\nBài viết này gợi ý các thói quen đơn giản như đứng dậy vận động mỗi giờ, uống đủ nước, giảm đồ ngọt và giữ nhịp ngủ nghỉ ổn định.\n\nDuy trì đều đặn vài thay đổi nhỏ sẽ hiệu quả hơn nhiều so với cố gắng một lúc rồi bỏ dở.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200',
    category: 'Sức khỏe',
  },
  {
    title: 'Checklist trước khi đi khám tổng quát buổi sáng',
    slug: 'demo-checklist-kham-tong-quat-buoi-sang',
    description: 'Buổi khám buổi sáng thường cần nhịn ăn từ 8-12 giờ, vì vậy bạn nên kiểm tra lại hướng dẫn của cơ sở y tế trước khi đi.\n\nĐừng quên mang theo giấy tờ tùy thân, thẻ bảo hiểm, đơn thuốc đang dùng và danh sách các câu hỏi muốn hỏi bác sĩ.\n\nNếu đang dùng thuốc huyết áp, tiểu đường hoặc thuốc đặc trị, hãy hỏi trước xem có cần tạm ngưng hay không.',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=1200',
    category: 'Dinh dưỡng',
  },
  {
    title: 'Nên ăn gì trước khi xét nghiệm máu?',
    slug: 'demo-nen-an-gi-truoc-khi-xet-nghiem-mau',
    description: 'Một số xét nghiệm máu yêu cầu nhịn ăn, nhưng vẫn có những loại cho phép bạn uống nước lọc hoặc dùng bữa nhẹ trước đó.\n\nBài viết giúp bạn phân biệt các trường hợp phổ biến để tránh ảnh hưởng kết quả xét nghiệm.\n\nNếu chưa chắc chắn, hãy gọi trước cho phòng khám để được hướng dẫn cụ thể.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    category: 'Dinh dưỡng',
  },
  {
    title: 'Khi nào nên đi khám định kỳ để phát hiện sớm bệnh?',
    slug: 'demo-khi-nao-nen-di-kham-dinh-ky',
    description: 'Khám định kỳ không chỉ dành cho người đang có triệu chứng mà còn giúp phát hiện sớm các nguy cơ tiềm ẩn.\n\nNgười trưởng thành nên duy trì lịch khám đều đặn theo độ tuổi, tiền sử bệnh và đặc thù công việc.\n\nBài viết này gợi ý khung thời gian phù hợp để bạn dễ sắp xếp kế hoạch theo dõi sức khỏe.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
    category: 'Cẩm nang',
  },
];

function avatarFor(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=400`;
}

function packageImage(index: number) {
  const images = [
    'https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ];
  return images[index % images.length];
}

function weekdayRows() {
  return [1, 2, 3, 4, 5, 6, 7].map((dayOfWeek) => ({
    dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek,
    isOpen: true,
    startTime: '07:30',
    endTime: '20:00',
  }));
}

function specialtySchedules(slotDurationMinutes: number, capacity = 2) {
  return [1, 2, 3, 4, 5, 6, 7].flatMap((dayOfWeek) => [
    {
      dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek,
      isActive: true,
      startTime: '07:30',
      endTime: '11:30',
      slotDurationMinutes,
      capacity,
    },
    {
      dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek,
      isActive: true,
      startTime: '13:30',
      endTime: '20:00',
      slotDurationMinutes,
      capacity,
    },
  ]);
}

function packageAvailability(slotDurationMinutes: number, capacity = 4) {
  return [1, 2, 3, 4, 5, 6, 7].map((dayOfWeek) => ({
    dayOfWeek: dayOfWeek === 7 ? 0 : dayOfWeek,
    isActive: true,
    startTime: '08:00',
    endTime: '17:30',
    slotDurationMinutes,
    capacity,
  }));
}

function datePlusDays(days: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
}

async function upsertUser(
  identityPrisma: IdentityClient,
  input: { email: string; role: UserRole; name: string; phone: string; avatar?: string },
) {
  const passwordHash = await bcrypt.hash(DEFAULT_PASS, 10);

  return identityPrisma.user.upsert({
    where: { email: input.email },
    update: {
      name: input.name,
      phone: input.phone,
      role: input.role,
      avatar: input.avatar,
      passwordHash,
      emailVerified: true,
      isActive: true,
    },
    create: {
      email: input.email,
      name: input.name,
      phone: input.phone,
      role: input.role,
      avatar: input.avatar,
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

  const identityAdapter = new PrismaPg({ connectionString: identityUrl });
  const identityPrisma = new IdentityClient({ adapter: identityAdapter });

  const adminAdapter = new PrismaPg({ connectionString: adminUrl });
  const adminPrisma = new AdminClient({ adapter: adminAdapter });

  const appointmentAdapter = new PrismaPg({ connectionString: appointmentUrl });
  const appointmentPrisma = new AppointmentClient({ adapter: appointmentAdapter });

  try {
    console.log('--- Cleaning up existing data across databases ---');
    // Clear in reverse order
    await appointmentPrisma.bookingReminderLog.deleteMany({});
    await appointmentPrisma.review.deleteMany({});
    await appointmentPrisma.booking.deleteMany({});

    await adminPrisma.clinicWorkingHour.deleteMany({});
    await adminPrisma.clinicSpecialtySchedule.deleteMany({});
    await adminPrisma.clinicSpecialty.deleteMany({});
    await adminPrisma.clinicAdmin.deleteMany({});
    await adminPrisma.doctor.deleteMany({});
    await adminPrisma.packageAvailability.deleteMany({});
    await adminPrisma.healthPackage.deleteMany({});
    await adminPrisma.clinic.deleteMany({});
    await adminPrisma.specialty.deleteMany({});
    await adminPrisma.article.deleteMany({});

    await identityPrisma.userDeviceToken.deleteMany({});
    await identityPrisma.notification.deleteMany({});
    await identityPrisma.user.deleteMany({});

    console.log('--- Seeding Identity Database ---');
    const superAdmin = await upsertUser(identityPrisma, {
      email: process.env.ADMIN_SEED_EMAIL || 'admin@demo.healthcare.vn',
      role: UserRole.ADMIN,
      name: 'Quản trị hệ thống Demo',
      phone: '0909000000',
      avatar: avatarFor('Quản trị Demo'),
    });

    await upsertUser(identityPrisma, {
      email: 'ops.manager@demo.healthcare.vn',
      role: UserRole.ADMIN,
      name: 'Điều phối vận hành Demo',
      phone: '0909000001',
      avatar: avatarFor('Điều phối vận hành'),
    });

    const patientUsers = new Map<string, Awaited<ReturnType<typeof upsertUser>>>();
    for (const p of patientSeeds) {
      const user = await upsertUser(identityPrisma, {
        email: p.email,
        role: UserRole.PATIENT,
        name: p.name,
        phone: p.phone,
        avatar: avatarFor(p.name),
      });
      patientUsers.set(p.email, user);
    }

    // Pre-seed User records for Clinic Admins and Doctors in Identity Service
    const userIdByEmail = new Map<string, string>();
    userIdByEmail.set(superAdmin.email, superAdmin.id);

    for (const clinicSeed of clinicSeeds) {
      const adminUser = await upsertUser(identityPrisma, {
        email: clinicSeed.email,
        role: UserRole.CLINIC_ADMIN,
        name: `Admin ${clinicSeed.name}`,
        phone: clinicSeed.phone,
        avatar: avatarFor(`Admin ${clinicSeed.name}`),
      });
      userIdByEmail.set(clinicSeed.email, adminUser.id);

      for (const doc of clinicSeed.doctors) {
        const docUser = await upsertUser(identityPrisma, {
          email: doc.email,
          role: UserRole.DOCTOR,
          name: doc.name,
          phone: doc.phone,
          avatar: avatarFor(doc.name),
        });
        userIdByEmail.set(doc.email, docUser.id);
      }
    }

    console.log('--- Seeding Clinic / Admin Database ---');
    // Specialties
    const specialtyIds = new Map<string, string>();
    const allSpecialties = Array.from(
      new Set(clinicSeeds.flatMap((c) => c.specialties.map((s) => s.name))),
    );

    for (const specialtyName of allSpecialties) {
      const specialty = await adminPrisma.specialty.upsert({
        where: { name: specialtyName },
        update: {},
        create: { name: specialtyName },
      });
      specialtyIds.set(specialtyName, specialty.id);
    }

    const doctorByEmail = new Map<string, string>();
    const packageByName = new Map<string, string>();
    const clinicByEmail = new Map<string, string>();

    for (let clinicIndex = 0; clinicIndex < clinicSeeds.length; clinicIndex++) {
      const clinicSeed = clinicSeeds[clinicIndex];
      const clinicAdminUserId = userIdByEmail.get(clinicSeed.email)!;

      const clinicPayload = {
        name: clinicSeed.name,
        description: clinicSeed.description,
        address: clinicSeed.address,
        phone: clinicSeed.phone,
        email: clinicSeed.email,
        website: clinicSeed.website,
        image: clinicImageByKey[clinicSeed.key],
        openingHours: clinicSeed.openingHours,
        isOpen: true,
        rating: 4.8,
        reviewCount: 120,
      };

      const clinic = await adminPrisma.clinic.create({
        data: {
          ...clinicPayload,
          workingHours: { create: weekdayRows() },
        },
      });
      clinicByEmail.set(clinicSeed.email, clinic.id);

      await adminPrisma.clinicAdmin.create({
        data: {
          userId: clinicAdminUserId,
          clinicId: clinic.id,
        },
      });

      for (const specialtySeed of clinicSeed.specialties) {
        const specialtyId = specialtyIds.get(specialtySeed.name)!;

        const clinicSpec = await adminPrisma.clinicSpecialty.create({
          data: {
            clinicId: clinic.id,
            specialtyId,
            schedules: {
              create: specialtySchedules(specialtySeed.slotDuration, specialtySeed.capacity),
            },
          },
        });

        const doctorsInSpecialty = clinicSeed.doctors.filter((doctor) => doctor.specialty === specialtySeed.name);

        for (const doctorSeed of doctorsInSpecialty) {
          const docUserId = userIdByEmail.get(doctorSeed.email)!;

          const doctor = await adminPrisma.doctor.create({
            data: {
              userId: docUserId,
              clinicId: clinic.id,
              specialtyId,
              name: doctorSeed.name,
              avatar: avatarFor(doctorSeed.name),
              bio: doctorSeed.bio,
              experience: doctorSeed.experience,
              qualifications: doctorSeed.qualifications,
              isAvailable: true,
            },
          });

          doctorByEmail.set(doctorSeed.email, doctor.id);
        }
      }

      for (let pkgIndex = 0; pkgIndex < clinicSeed.packages.length; pkgIndex++) {
        const pkgSeed = clinicSeed.packages[pkgIndex];
        const specialtyId = pkgSeed.specialty ? specialtyIds.get(pkgSeed.specialty) : null;

        const payload = {
          clinicId: clinic.id,
          specialtyId: specialtyId || null,
          name: pkgSeed.name,
          shortDescription: pkgSeed.shortDescription,
          description: pkgSeed.description,
          category: pkgSeed.category,
          price: pkgSeed.price,
          promotionalPrice: pkgSeed.promotionalPrice ?? null,
          targetGender: pkgSeed.targetGender || null,
          targetAgeRange: pkgSeed.targetAgeRange || null,
          preparationNotes: pkgSeed.preparationNotes || null,
          features: pkgSeed.features,
          imageUrl: packageImage(clinicIndex + pkgIndex),
          isActive: true,
          isPopular: true,
          availabilities: {
            create: packageAvailability(45, 4),
          },
        };

        const healthPackage = await adminPrisma.healthPackage.create({ data: payload });
        packageByName.set(pkgSeed.name, healthPackage.id);
      }
    }

    // Seed Articles
    for (const article of articleSeeds) {
      await adminPrisma.article.create({ data: article });
    }

    console.log('--- Seeding Appointment / Booking Database ---');
    const patientAn = patientUsers.get('patient.an@demo.healthcare.vn')!;
    const patientBinh = patientUsers.get('patient.binh@demo.healthcare.vn')!;
    const patientChau = patientUsers.get('patient.chau@demo.healthcare.vn')!;
    const patientDuc = patientUsers.get('patient.duc@demo.healthcare.vn')!;
    const patientVy = patientUsers.get('patient.vy@demo.healthcare.vn')!;
    const patientNam = patientUsers.get('patient.nam@demo.healthcare.vn')!;

    const doctorMinhAnh = doctorByEmail.get('doctor.minhanh@demo.healthcare.vn')!;
    const doctorHoangPhuc = doctorByEmail.get('doctor.hoangphuc@demo.healthcare.vn')!;
    const doctorKhanhLinh = doctorByEmail.get('doctor.khanhlinh@demo.healthcare.vn')!;
    const doctorDucThanh = doctorByEmail.get('doctor.ducthanh@demo.healthcare.vn')!;

    const clinicTamDucId = clinicByEmail.get('tamduc.admin@demo.healthcare.vn')!;
    const clinicAnhDuongId = clinicByEmail.get('anhduong.admin@demo.healthcare.vn')!;
    const clinicSaiGonCareId = clinicByEmail.get('saigoncare.admin@demo.healthcare.vn')!;

    const pkgTongQuatId = packageByName.get('Gói khám sức khỏe tổng quát doanh nghiệp Tâm Đức')!;
    const pkgPhuKhoaId = packageByName.get('Gói khám phụ khoa định kỳ Ánh Dương')!;

    const booking1Date = datePlusDays(1);
    const booking2Date = datePlusDays(2);
    const booking3Date = datePlusDays(-3);
    const booking4Date = datePlusDays(5);
    const booking5Date = datePlusDays(4);
    const booking6Date = datePlusDays(7);

    // Seed Doctor Consultation Bookings
    const booking1 = await appointmentPrisma.booking.create({
      data: {
        userId: patientAn.id,
        clinicId: clinicTamDucId,
        doctorId: doctorMinhAnh,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: booking1Date,
        bookingTime: '08:30',
        patientName: patientAn.name,
        patientEmail: patientAn.email,
        patientPhone: patientAn.phone || '',
        patientGender: Gender.MALE,
        patientDob: new Date('1996-04-12'),
        reason: 'Tái khám kiểm tra men gan.',
        status: BookingStatus.CONFIRMED,
      },
    });

    await appointmentPrisma.booking.create({
      data: {
        userId: patientBinh.id,
        clinicId: clinicTamDucId,
        doctorId: doctorHoangPhuc,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: booking2Date,
        bookingTime: '14:00',
        patientName: patientBinh.name,
        patientEmail: patientBinh.email,
        patientPhone: patientBinh.phone || '',
        patientGender: Gender.FEMALE,
        patientDob: new Date('1999-08-21'),
        reason: 'Khám hồi hộp tim và khó thở nhẹ khi gắng sức.',
        status: BookingStatus.PENDING,
      },
    });

    const completedBooking = await appointmentPrisma.booking.create({
      data: {
        userId: patientChau.id,
        clinicId: clinicAnhDuongId,
        doctorId: doctorKhanhLinh,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: booking3Date,
        bookingTime: '09:15',
        patientName: patientChau.name,
        patientEmail: patientChau.email,
        patientPhone: patientChau.phone || '',
        patientGender: Gender.FEMALE,
        patientDob: new Date('1988-11-05'),
        reason: 'Tái khám sau điều trị viêm phụ khoa.',
        status: BookingStatus.COMPLETED,
      },
    });

    await appointmentPrisma.booking.create({
      data: {
        userId: patientAn.id,
        clinicId: clinicSaiGonCareId,
        doctorId: doctorDucThanh,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: booking4Date,
        bookingTime: '10:30',
        patientName: patientAn.name,
        patientEmail: patientAn.email,
        patientPhone: patientAn.phone || '',
        patientGender: Gender.MALE,
        patientDob: new Date('1996-04-12'),
        reason: 'Khám đau lưng do ngồi lâu.',
        status: BookingStatus.CANCELLED,
        cancellationReason: 'Khách thay đổi lịch công tác đột xuất',
        cancelledAt: new Date(),
      },
    });

    // Seed Package Bookings
    await appointmentPrisma.booking.create({
      data: {
        userId: patientBinh.id,
        clinicId: clinicTamDucId,
        bookingType: BookingType.HEALTH_PACKAGE,
        bookingDate: booking5Date,
        bookingTime: '08:00',
        patientName: patientBinh.name,
        patientEmail: patientBinh.email,
        patientPhone: patientBinh.phone || '',
        patientGender: Gender.FEMALE,
        patientDob: new Date('1999-08-21'),
        reason: 'Khám sức khỏe định kỳ công ty quý II.',
        status: BookingStatus.CONFIRMED,
        notes: `Đăng ký gói khám: Gói khám sức khỏe tổng quát doanh nghiệp Tâm Đức (ID: ${pkgTongQuatId})`,
        packageId: pkgTongQuatId,
      },
    });

    await appointmentPrisma.booking.create({
      data: {
        userId: patientChau.id,
        clinicId: clinicAnhDuongId,
        bookingType: BookingType.HEALTH_PACKAGE,
        bookingDate: booking6Date,
        bookingTime: '15:00',
        patientName: patientChau.name,
        patientEmail: patientChau.email,
        patientPhone: patientChau.phone || '',
        patientGender: Gender.FEMALE,
        patientDob: new Date('1988-11-05'),
        reason: 'Đăng ký gói phụ khoa định kỳ.',
        status: BookingStatus.PENDING,
        notes: `Đăng ký gói khám: Gói khám phụ khoa định kỳ Ánh Dương (ID: ${pkgPhuKhoaId})`,
        packageId: pkgPhuKhoaId,
      },
    });

    // Reviews
    await appointmentPrisma.review.create({
      data: {
        bookingId: completedBooking.id,
        userId: completedBooking.userId,
        doctorId: completedBooking.doctorId,
        clinicId: completedBooking.clinicId,
        rating: 5,
        comment: 'Bác sĩ tư vấn kỹ, quy trình khám nhanh, nhân viên hỗ trợ nhiệt tình.',
      },
    });

    // Add completed doctor bookings & reviews for BS.CKII Lê Minh Anh (doctorMinhAnh)
    const bookingMinhAnh1 = await appointmentPrisma.booking.create({
      data: {
        userId: patientAn.id,
        clinicId: clinicTamDucId,
        doctorId: doctorMinhAnh,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: datePlusDays(-10),
        bookingTime: '09:00',
        patientName: patientAn.name,
        patientEmail: patientAn.email,
        patientPhone: patientAn.phone || '',
        patientGender: Gender.MALE,
        patientDob: new Date('1996-04-12'),
        reason: 'Kiểm tra sức khỏe tổng quát.',
        status: BookingStatus.COMPLETED,
      },
    });

    await appointmentPrisma.review.create({
      data: {
        bookingId: bookingMinhAnh1.id,
        userId: patientAn.id,
        doctorId: doctorMinhAnh,
        clinicId: clinicTamDucId,
        rating: 5,
        comment: 'Bác sĩ Lê Minh Anh thăm khám cực kỳ kỹ lưỡng, giải thích các chỉ số xét nghiệm cặn kẽ và tư vấn chế độ ăn rất thực tế. Rất hài lòng!',
      },
    });

    const bookingMinhAnh2 = await appointmentPrisma.booking.create({
      data: {
        userId: patientVy.id,
        clinicId: clinicTamDucId,
        doctorId: doctorMinhAnh,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: datePlusDays(-8),
        bookingTime: '10:00',
        patientName: patientVy.name,
        patientEmail: patientVy.email,
        patientPhone: patientVy.phone || '',
        patientGender: Gender.FEMALE,
        patientDob: new Date('1995-07-29'),
        reason: 'Tư vấn giảm mỡ máu.',
        status: BookingStatus.COMPLETED,
      },
    });

    await appointmentPrisma.review.create({
      data: {
        bookingId: bookingMinhAnh2.id,
        userId: patientVy.id,
        doctorId: doctorMinhAnh,
        clinicId: clinicTamDucId,
        rating: 5,
        comment: 'Bác sĩ tư vấn nhiệt tình, dễ thương. Chế độ ăn kiêng và tập luyện bác sĩ hướng dẫn rất dễ áp dụng, chỉ số mỡ máu của mình đã giảm hẳn sau 1 tháng.',
      },
    });

    const bookingMinhAnh3 = await appointmentPrisma.booking.create({
      data: {
        userId: patientNam.id,
        clinicId: clinicTamDucId,
        doctorId: doctorMinhAnh,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: datePlusDays(-5),
        bookingTime: '15:30',
        patientName: patientNam.name,
        patientEmail: patientNam.email,
        patientPhone: patientNam.phone || '',
        patientGender: Gender.MALE,
        patientDob: new Date('1985-05-18'),
        reason: 'Điều trị trào ngược dạ dày.',
        status: BookingStatus.COMPLETED,
      },
    });

    await appointmentPrisma.review.create({
      data: {
        bookingId: bookingMinhAnh3.id,
        userId: patientNam.id,
        doctorId: doctorMinhAnh,
        clinicId: clinicTamDucId,
        rating: 4,
        comment: 'Bác sĩ chuyên môn cao, hỏi bệnh rất kỹ và kê đơn thuốc hợp lý. Bệnh trào ngược của tôi đã đỡ nhiều. Điểm trừ duy nhất là phòng khám hơi đông nên phải đợi một lúc.',
      },
    });

    // Add completed doctor bookings & reviews for BS Nguyễn Hoàng Phúc (doctorHoangPhuc)
    const bookingHoangPhuc1 = await appointmentPrisma.booking.create({
      data: {
        userId: patientDuc.id,
        clinicId: clinicTamDucId,
        doctorId: doctorHoangPhuc,
        bookingType: BookingType.DOCTOR_CONSULTATION,
        bookingDate: datePlusDays(-4),
        bookingTime: '14:30',
        patientName: patientDuc.name,
        patientEmail: patientDuc.email,
        patientPhone: patientDuc.phone || '',
        patientGender: Gender.MALE,
        patientDob: new Date('1992-03-15'),
        reason: 'Khám tim định kỳ.',
        status: BookingStatus.COMPLETED,
      },
    });

    await appointmentPrisma.review.create({
      data: {
        bookingId: bookingHoangPhuc1.id,
        userId: patientDuc.id,
        doctorId: doctorHoangPhuc,
        clinicId: clinicTamDucId,
        rating: 5,
        comment: 'Bác sĩ Phúc kiểm tra tim mạch rất chuyên nghiệp, siêu âm kỹ càng và tư vấn cặn kẽ về tình trạng sức khỏe của tôi. Cảm giác rất an tâm khi khám ở đây.',
      },
    });

    // Reminder Logs
    await appointmentPrisma.bookingReminderLog.create({
      data: {
        bookingId: booking1.id,
        channel: 'EMAIL',
        reminderType: 'BEFORE_APPOINTMENT',
        status: 'SENT',
        sentAt: new Date(),
        scheduledFor: new Date(),
        attemptCount: 1,
      },
    });

    console.log('--- Multi-database Seed Demo Completed Successfully! ---');
    console.log(`Default password: ${DEFAULT_PASS}`);
    console.log('Demo accounts created:');
    console.log(`- System Admin: ${superAdmin.email}`);
    console.log(`- Clinic Admin: tamduc.admin@demo.healthcare.vn (Clinic: Tâm Đức)`);
    console.log(`- Doctor: doctor.minhanh@demo.healthcare.vn (Specialty: Nội tổng quát)`);
    console.log(`- Patient: patient.an@demo.healthcare.vn`);

  } catch (error) {
    console.error('Error during database seed execution:', error);
    process.exit(1);
  } finally {
    await identityPrisma.$disconnect();
    await adminPrisma.$disconnect();
    await appointmentPrisma.$disconnect();
  }
}

main();
