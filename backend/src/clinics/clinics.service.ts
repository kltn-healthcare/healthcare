import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ERROR_CODES } from '../common/constants/error-codes';
import { QueryClinicsDto } from './dto/query-clinics.dto';

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(dto: QueryClinicsDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 12;
    const skip = (page - 1) * limit;

    const where = {
      ...(dto.q
        ? {
            OR: [
              { name: { contains: dto.q, mode: 'insensitive' as const } },
              { address: { contains: dto.q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(dto.specialtyId
        ? { specialties: { some: { specialtyId: dto.specialtyId } } }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.clinic.findMany({
        where,
        orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          address: true,
          phone: true,
          email: true,
          website: true,
          rating: true,
          reviewCount: true,
          image: true,
          isOpen: true,
          openingHours: true,
          bankInfo: true,
          depositAmount: true,
          specialties: {
            select: { specialty: { select: { id: true, name: true } } },
            orderBy: { specialty: { name: 'asc' } },
          },
        },
      }),
      this.prisma.clinic.count({ where }),
    ]);

    return {
      items: items.map((c) => ({
        ...c,
        rating: c.rating.toString(),
        specialties: c.specialties.map((row) => row.specialty),
      })),
      page,
      limit,
      total,
    };
  }

  async getById(id: string) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        phone: true,
        email: true,
        website: true,
        rating: true,
        reviewCount: true,
        image: true,
        isOpen: true,
        openingHours: true,
        bankInfo: true,
        depositAmount: true,
        doctors: {
          select: {
            id: true,
            name: true,
            avatar: true,
            experience: true,
            isAvailable: true,
            specialty: { select: { id: true, name: true } },
          },
          take: 12,
        },
        specialties: {
          select: { specialty: { select: { id: true, name: true } } },
          orderBy: { specialty: { name: 'asc' } },
        },
        healthPackages: {
          where: { isActive: true },
          orderBy: [{ isPopular: 'desc' }, { createdAt: 'desc' }],
          select: {
            id: true,
            name: true,
            shortDescription: true,
            description: true,
            price: true,
            promotionalPrice: true,
            currency: true,
            category: true,
            isPopular: true,
            features: true,
            imageUrl: true,
            clinicId: true,
            specialtyId: true,
            specialty: { select: { id: true, name: true } },
          },
          take: 8,
        },
      },
    });
    if (!clinic) {
      throw new NotFoundException({
        code: ERROR_CODES.CLINIC_NOT_FOUND,
        message: 'Clinic not found',
      });
    }
    return {
      ...clinic,
      rating: clinic.rating.toString(),
      specialties: clinic.specialties.map((row) => row.specialty),
      healthPackages: clinic.healthPackages.map((item) => ({
        ...item,
        price: item.price.toString(),
        promotionalPrice: item.promotionalPrice?.toString() ?? null,
      })),
    };
  }
}
