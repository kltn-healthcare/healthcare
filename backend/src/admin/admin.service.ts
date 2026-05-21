import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { QueryAdminUsersDto } from './dto/query-admin-users.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateClinicAdminDto } from './dto/create-clinic-admin.dto';
import { UpdateClinicAdminDto } from './dto/update-clinic-admin.dto';
import { CreateDoctorAdminDto } from './dto/create-doctor-admin.dto';
import { UpdateDoctorAdminDto } from './dto/update-doctor-admin.dto';
import { CreateArticleAdminDto } from './dto/create-article-admin.dto';
import { UpdateArticleAdminDto } from './dto/update-article-admin.dto';
import { CreatePackageAdminDto } from './dto/create-package-admin.dto';
import { UpdatePackageAdminDto } from './dto/update-package-admin.dto';

const adminArticleSelect = {
  id: true,
  title: true,
  description: true,
  image: true,
  category: true,
  readTime: true,
  slug: true,
  publishedAt: true,
  updatedAt: true,
} as const;

const DEFAULT_ARTICLE_CATEGORY = 'Cẩm nang';
const DEFAULT_ARTICLE_READ_TIME = '5 phút';

const adminPackageSelect = {
  id: true,
  name: true,
  shortDescription: true,
  description: true,
  price: true,
  promotionalPrice: true,
  currency: true,
  category: true,
  targetGender: true,
  targetAgeRange: true,
  preparationNotes: true,
  isPopular: true,
  isActive: true,
  features: true,
  imageUrl: true,
  clinicId: true,
  clinic: { select: { id: true, name: true, address: true } },
  specialtyId: true,
  specialty: { select: { id: true, name: true } },
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers(query: QueryAdminUsersDto) {
    const items = await this.prisma.user.findMany({
      where: query.role ? { role: query.role } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 500,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        doctorProfile: {
          select: {
            id: true,
            clinicId: true,
            specialtyId: true,
            isAvailable: true,
          },
        },
        clinicAdminProfile: {
          select: {
            id: true,
            clinicId: true,
            clinic: { select: { id: true, name: true } },
          },
        },
      },
    });

    return { items };
  }

  async createUser(dto: CreateAdminUserDto) {
    if (dto.role !== UserRole.DOCTOR && dto.role !== UserRole.CLINIC_ADMIN) {
      throw new BadRequestException({
        code: 'ADMIN_USER_CREATE_ROLE_NOT_ALLOWED',
        message: 'Admin can only create doctor or clinic admin accounts',
      });
    }

    if (dto.role === UserRole.CLINIC_ADMIN && !dto.clinicId) {
      throw new BadRequestException({
        code: 'CLINIC_ADMIN_CLINIC_REQUIRED',
        message: 'clinicId is required when creating a clinic admin account',
      });
    }

    const email = dto.email.trim().toLowerCase();

    const existing = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException({
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'Email already exists',
      });
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    if (dto.clinicId) {
      await this.assertClinicExists(dto.clinicId);
    }

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: dto.name.trim(),
          email,
          phone: dto.phone?.trim(),
          role: dto.role,
          passwordHash,
          emailVerified: true,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
        },
      });

      if (dto.role === UserRole.CLINIC_ADMIN && dto.clinicId) {
        await tx.clinicAdmin.create({
          data: {
            userId: user.id,
            clinicId: dto.clinicId,
          },
        });
      }

      return user;
    });
  }

  async updateUser(id: string, dto: UpdateAdminUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      });
    }

    const updateData: Record<string, unknown> = {};

    if (dto.name !== undefined) {
      updateData.name = dto.name.trim();
    }
    if (dto.email !== undefined) {
      updateData.email = dto.email.trim().toLowerCase();
    }
    if (dto.phone !== undefined) {
      updateData.phone = dto.phone.trim();
    }
    if (dto.role !== undefined) {
      updateData.role = dto.role;
    }
    if (dto.isActive !== undefined) {
      updateData.isActive = dto.isActive;
    }

    if (dto.password) {
      updateData.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
      },
    });
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { id };
  }

  async listClinics() {
    const items = await this.prisma.clinic.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        phone: true,
        email: true,
        website: true,
        image: true,
        openingHours: true,
        isOpen: true,
        rating: true,
        reviewCount: true,
        specialties: {
          select: { specialty: { select: { id: true, name: true } } },
          orderBy: { specialty: { name: 'asc' } },
        },
        createdAt: true,
      },
    });

    return {
      items: items.map((item) => ({
        ...item,
        rating: item.rating.toString(),
        specialties: item.specialties.map((row) => row.specialty),
      })),
    };
  }

  async createClinic(dto: CreateClinicAdminDto) {
    const specialtyIds = await this.normalizeSpecialtyIds(dto.specialtyIds);

    const clinic = await this.prisma.clinic.create({
      data: {
        name: dto.name.trim(),
        address: dto.address.trim(),
        description: dto.description,
        phone: dto.phone,
        email: dto.email,
        website: dto.website,
        image: dto.image,
        openingHours: dto.openingHours,
        isOpen: dto.isOpen ?? true,
        specialties: specialtyIds.length
          ? {
              create: specialtyIds.map((specialtyId) => ({
                specialty: { connect: { id: specialtyId } },
              })),
            }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        phone: true,
        email: true,
        website: true,
        image: true,
        openingHours: true,
        isOpen: true,
        rating: true,
        reviewCount: true,
        specialties: {
          select: { specialty: { select: { id: true, name: true } } },
          orderBy: { specialty: { name: 'asc' } },
        },
      },
    });

    return {
      ...clinic,
      rating: clinic.rating.toString(),
      specialties: clinic.specialties.map((row) => row.specialty),
    };
  }

  async updateClinic(id: string, dto: UpdateClinicAdminDto) {
    const data: Record<string, unknown> = {};

    if (dto.name !== undefined) {
      data.name = dto.name.trim();
    }
    if (dto.address !== undefined) {
      data.address = dto.address.trim();
    }
    if (dto.description !== undefined) {
      data.description = dto.description;
    }
    if (dto.phone !== undefined) {
      data.phone = dto.phone;
    }
    if (dto.email !== undefined) {
      data.email = dto.email;
    }
    if (dto.website !== undefined) {
      data.website = dto.website;
    }
    if (dto.image !== undefined) {
      data.image = dto.image;
    }
    if (dto.openingHours !== undefined) {
      data.openingHours = dto.openingHours;
    }
    if (dto.isOpen !== undefined) {
      data.isOpen = dto.isOpen;
    }
    if (dto.specialtyIds !== undefined) {
      const specialtyIds = await this.normalizeSpecialtyIds(dto.specialtyIds);

      data.specialties = {
        deleteMany: {},
        create: specialtyIds.map((specialtyId) => ({
          specialty: { connect: { id: specialtyId } },
        })),
      };
    }

    const clinic = await this.prisma.clinic.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        phone: true,
        email: true,
        website: true,
        image: true,
        openingHours: true,
        isOpen: true,
        rating: true,
        reviewCount: true,
        specialties: {
          select: { specialty: { select: { id: true, name: true } } },
          orderBy: { specialty: { name: 'asc' } },
        },
      },
    });

    return {
      ...clinic,
      rating: clinic.rating.toString(),
      specialties: clinic.specialties.map((row) => row.specialty),
    };
  }

  async deleteClinic(id: string) {
    await this.prisma.clinic.delete({ where: { id } });
    return { id };
  }

  async listDoctors() {
    const items = await this.prisma.doctor.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
      select: {
        id: true,
        name: true,
        experience: true,
        avatar: true,
        bio: true,
        isAvailable: true,
        clinic: { select: { id: true, name: true } },
        specialty: { select: { id: true, name: true } },
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    return { items };
  }

  async createDoctor(dto: CreateDoctorAdminDto) {
    await this.assertClinicHasSpecialty(dto.clinicId, dto.specialtyId);

    const email = dto.email?.trim().toLowerCase();
    if (!dto.userId && (!email || !dto.password)) {
      throw new BadRequestException({
        code: 'DOCTOR_ACCOUNT_REQUIRED',
        message: 'Doctor email and password are required when userId is not provided',
      });
    }

    const doctor = await this.prisma.$transaction(async (tx) => {
      let userId = dto.userId;

      if (!userId && email && dto.password) {
        const existing = await tx.user.findUnique({
          where: { email },
          select: { id: true },
        });

        if (existing) {
          throw new ConflictException({
            code: 'EMAIL_ALREADY_EXISTS',
            message: 'Email already exists',
          });
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await tx.user.create({
          data: {
            name: dto.name.trim(),
            email,
            phone: dto.phone?.trim(),
            role: UserRole.DOCTOR,
            passwordHash,
            emailVerified: true,
          },
          select: { id: true },
        });
        userId = user.id;
      }

      return tx.doctor.create({
        data: {
          clinicId: dto.clinicId,
          specialtyId: dto.specialtyId,
          userId,
          name: dto.name.trim(),
          experience: dto.experience ?? 0,
          avatar: dto.avatar,
          bio: dto.bio,
          isAvailable: dto.isAvailable ?? true,
        },
      select: {
        id: true,
        name: true,
        experience: true,
        avatar: true,
        bio: true,
        isAvailable: true,
        clinic: { select: { id: true, name: true } },
        specialty: { select: { id: true, name: true } },
          user: { select: { id: true, name: true, email: true, phone: true } },
      },
      });
    });

    return doctor;
  }

  async updateDoctor(id: string, dto: UpdateDoctorAdminDto) {
    const data: Record<string, unknown> = {};

    if (dto.clinicId !== undefined) {
      data.clinicId = dto.clinicId;
    }
    if (dto.specialtyId !== undefined) {
      data.specialtyId = dto.specialtyId;
    }
    if (dto.userId !== undefined) {
      data.userId = dto.userId;
    }
    if (dto.name !== undefined) {
      data.name = dto.name;
    }
    if (dto.experience !== undefined) {
      data.experience = dto.experience;
    }
    if (dto.avatar !== undefined) {
      data.avatar = dto.avatar;
    }
    if (dto.bio !== undefined) {
      data.bio = dto.bio;
    }
    if (dto.isAvailable !== undefined) {
      data.isAvailable = dto.isAvailable;
    }

    if (dto.clinicId !== undefined || dto.specialtyId !== undefined) {
      const current = await this.prisma.doctor.findUnique({
        where: { id },
        select: { clinicId: true, specialtyId: true },
      });

      if (!current) {
        throw new NotFoundException({
          code: 'DOCTOR_NOT_FOUND',
          message: 'Doctor not found',
        });
      }

      const nextClinicId = dto.clinicId ?? current.clinicId;
      const nextSpecialtyId = dto.specialtyId ?? current.specialtyId;
      await this.assertClinicHasSpecialty(nextClinicId, nextSpecialtyId);
    }

    const doctor = await this.prisma.doctor.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        experience: true,
        avatar: true,
        bio: true,
        isAvailable: true,
        clinic: { select: { id: true, name: true } },
        specialty: { select: { id: true, name: true } },
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    return doctor;
  }

  async deleteDoctor(id: string) {
    await this.prisma.doctor.delete({ where: { id } });
    return { id };
  }

  private async assertClinicHasSpecialty(
    clinicId: string,
    specialtyId: string,
  ) {
    const match = await this.prisma.clinicSpecialty.findUnique({
      where: { clinicId_specialtyId: { clinicId, specialtyId } },
      select: { clinicId: true },
    });

    if (!match) {
      throw new BadRequestException({
        code: 'CLINIC_SPECIALTY_NOT_ALLOWED',
        message: 'Selected specialty is not enabled for this clinic',
      });
    }
  }

  private async normalizeSpecialtyIds(specialtyIds?: string[]) {
    if (!specialtyIds?.length) {
      return [];
    }

    const normalizedIds = Array.from(
      new Set(
        specialtyIds.map((specialtyId) => specialtyId.trim()).filter(Boolean),
      ),
    );

    if (!normalizedIds.length) {
      return [];
    }

    const existingSpecialties = await this.prisma.specialty.findMany({
      where: { id: { in: normalizedIds } },
      select: { id: true },
    });
    const existingIds = new Set(existingSpecialties.map((item) => item.id));
    const missingIds = normalizedIds.filter((id) => !existingIds.has(id));

    if (missingIds.length) {
      throw new BadRequestException({
        code: 'CLINIC_SPECIALTY_INVALID',
        message: 'One or more selected specialties do not exist',
      });
    }

    return normalizedIds;
  }

  async listArticles() {
    const items = await this.prisma.article.findMany({
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 500,
      select: adminArticleSelect,
    });

    return { items };
  }

  async createArticle(dto: CreateArticleAdminDto) {
    const title = dto.title.trim();
    const description = dto.description.trim();
    const baseSlug = this.slugify((dto.slug ?? title).trim());

    if (!baseSlug) {
      throw new BadRequestException({
        code: 'ARTICLE_SLUG_INVALID',
        message: 'Article slug is invalid',
      });
    }

    const slug = await this.generateUniqueArticleSlug(baseSlug);

    return this.prisma.article.create({
      data: {
        title,
        description,
        image: dto.image?.trim() || undefined,
        category: dto.category?.trim() || DEFAULT_ARTICLE_CATEGORY,
        readTime: dto.readTime?.trim() || DEFAULT_ARTICLE_READ_TIME,
        slug,
      },
      select: adminArticleSelect,
    });
  }

  async updateArticle(id: string, dto: UpdateArticleAdminDto) {
    const current = await this.prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!current) {
      throw new NotFoundException({
        code: 'ARTICLE_NOT_FOUND',
        message: 'Article not found',
      });
    }

    const data: Record<string, unknown> = {};

    if (dto.title !== undefined) {
      data.title = dto.title.trim();
    }
    if (dto.description !== undefined) {
      data.description = dto.description.trim();
    }
    if (dto.image !== undefined) {
      data.image = dto.image.trim() || null;
    }
    if (dto.category !== undefined) {
      data.category = dto.category.trim() || DEFAULT_ARTICLE_CATEGORY;
    }
    if (dto.readTime !== undefined) {
      data.readTime = dto.readTime.trim() || DEFAULT_ARTICLE_READ_TIME;
    }

    if (dto.slug !== undefined || dto.title !== undefined) {
      const slugSource = dto.slug?.trim() || dto.title?.trim() || current.slug;
      const baseSlug = this.slugify(slugSource);
      if (!baseSlug) {
        throw new BadRequestException({
          code: 'ARTICLE_SLUG_INVALID',
          message: 'Article slug is invalid',
        });
      }

      data.slug = await this.generateUniqueArticleSlug(baseSlug, id);
    }

    return this.prisma.article.update({
      where: { id },
      data,
      select: adminArticleSelect,
    });
  }

  async deleteArticle(id: string) {
    const existing = await this.prisma.article.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException({
        code: 'ARTICLE_NOT_FOUND',
        message: 'Article not found',
      });
    }

    await this.prisma.article.delete({ where: { id } });
    return { id };
  }

  async listPackages() {
    const items = await this.prisma.healthPackage.findMany({
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
      take: 500,
      select: adminPackageSelect,
    });

    return { items: items.map((item) => this.serializePackage(item)) };
  }

  async createPackage(dto: CreatePackageAdminDto) {
    await this.assertClinicExists(dto.clinicId);
    await this.assertClinicHasSpecialty(dto.clinicId, dto.specialtyId);

    const item = await this.prisma.healthPackage.create({
      data: this.buildPackageCreateData(dto),
      select: adminPackageSelect,
    });

    return this.serializePackage(item);
  }

  async updatePackage(id: string, dto: UpdatePackageAdminDto) {
    const current = await this.prisma.healthPackage.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!current) {
      throw new NotFoundException({
        code: 'PACKAGE_NOT_FOUND',
        message: 'Health package not found',
      });
    }

    if (dto.clinicId !== undefined) {
      await this.assertClinicExists(dto.clinicId);
    }

    if (dto.clinicId !== undefined || dto.specialtyId !== undefined) {
      const currentPackage = await this.prisma.healthPackage.findUnique({
        where: { id },
        select: { clinicId: true, specialtyId: true },
      });
      const nextClinicId = dto.clinicId ?? currentPackage?.clinicId;
      const nextSpecialtyId = dto.specialtyId ?? currentPackage?.specialtyId;
      if (nextClinicId && nextSpecialtyId) {
        await this.assertClinicHasSpecialty(nextClinicId, nextSpecialtyId);
      }
    }

    const item = await this.prisma.healthPackage.update({
      where: { id },
      data: this.buildPackageUpdateData(dto),
      select: adminPackageSelect,
    });

    return this.serializePackage(item);
  }

  async deletePackage(id: string) {
    const current = await this.prisma.healthPackage.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!current) {
      throw new NotFoundException({
        code: 'PACKAGE_NOT_FOUND',
        message: 'Health package not found',
      });
    }

    await this.prisma.healthPackage.delete({ where: { id } });
    return { id };
  }

  private buildPackageCreateData(dto: CreatePackageAdminDto) {
    return {
      clinicId: dto.clinicId,
      specialtyId: dto.specialtyId,
      name: dto.name.trim(),
      shortDescription: dto.shortDescription?.trim() || undefined,
      description: dto.description.trim(),
      price: new Prisma.Decimal(dto.price),
      promotionalPrice:
        dto.promotionalPrice !== undefined && dto.promotionalPrice !== null
          ? new Prisma.Decimal(dto.promotionalPrice)
          : undefined,
      currency: dto.currency?.trim() || 'VND',
      category: dto.category?.trim() || 'general',
      targetGender: dto.targetGender?.trim() || undefined,
      targetAgeRange: dto.targetAgeRange?.trim() || undefined,
      preparationNotes: dto.preparationNotes?.trim() || undefined,
      isPopular: dto.isPopular ?? false,
      isActive: dto.isActive ?? true,
      features: this.normalizePackageFeatures(dto.features),
      imageUrl: dto.imageUrl?.trim() || undefined,
    };
  }

  private buildPackageUpdateData(dto: UpdatePackageAdminDto) {
    const data: Record<string, unknown> = {};

    if (dto.clinicId !== undefined) data.clinicId = dto.clinicId;
    if (dto.specialtyId !== undefined) data.specialtyId = dto.specialtyId;
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.shortDescription !== undefined) {
      data.shortDescription = dto.shortDescription.trim() || null;
    }
    if (dto.description !== undefined) data.description = dto.description.trim();
    if (dto.price !== undefined) data.price = new Prisma.Decimal(dto.price);
    if (dto.promotionalPrice !== undefined) {
      data.promotionalPrice =
        dto.promotionalPrice === null
          ? null
          : new Prisma.Decimal(dto.promotionalPrice);
    }
    if (dto.currency !== undefined) data.currency = dto.currency.trim() || 'VND';
    if (dto.category !== undefined) data.category = dto.category.trim() || 'general';
    if (dto.targetGender !== undefined) {
      data.targetGender = dto.targetGender.trim() || null;
    }
    if (dto.targetAgeRange !== undefined) {
      data.targetAgeRange = dto.targetAgeRange.trim() || null;
    }
    if (dto.preparationNotes !== undefined) {
      data.preparationNotes = dto.preparationNotes.trim() || null;
    }
    if (dto.isPopular !== undefined) data.isPopular = dto.isPopular;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.features !== undefined) {
      data.features = this.normalizePackageFeatures(dto.features);
    }
    if (dto.imageUrl !== undefined) data.imageUrl = dto.imageUrl.trim() || null;

    return data;
  }

  private normalizePackageFeatures(features?: string[]) {
    return (features ?? []).map((item) => item.trim()).filter(Boolean);
  }

  private async assertClinicExists(clinicId: string) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id: clinicId },
      select: { id: true },
    });

    if (!clinic) {
      throw new BadRequestException({
        code: 'PACKAGE_CLINIC_INVALID',
        message: 'Selected clinic does not exist',
      });
    }
  }

  private serializePackage<T extends {
    price: { toString(): string };
    promotionalPrice: { toString(): string } | null;
  }>(item: T) {
    return {
      ...item,
      price: item.price.toString(),
      promotionalPrice: item.promotionalPrice?.toString() ?? null,
    };
  }

  private async generateUniqueArticleSlug(
    baseSlug: string,
    excludeId?: string,
  ): Promise<string> {
    let candidate = baseSlug;
    let suffix = 2;

    while (true) {
      const existing = await this.prisma.article.findFirst({
        where: excludeId
          ? { slug: candidate, NOT: { id: excludeId } }
          : { slug: candidate },
        select: { id: true },
      });

      if (!existing) {
        return candidate;
      }

      candidate = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
  }

  private slugify(value: string): string {
    return value
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replaceAll(/[^a-z0-9\s-]/g, '')
      .replaceAll(/\s+/g, '-')
      .replaceAll(/-+/g, '-');
  }
}
