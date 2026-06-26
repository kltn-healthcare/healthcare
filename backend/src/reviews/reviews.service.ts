import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewsDto } from './dto/query-reviews.dto';

const localReviewSelect = {
  id: true,
  userId: true,
  doctorId: true,
  clinicId: true,
  rating: true,
  comment: true,
  createdAt: true,
} as const;

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateReviewDto) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id: dto.bookingId,
        userId,
      },
      select: {
        id: true,
        status: true,
        doctorId: true,
        clinicId: true,
        review: { select: { id: true } },
      },
    });

    if (!booking) {
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    }

    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException({
        code: 'BOOKING_NOT_COMPLETED',
        message: 'You can only review completed bookings',
      });
    }

    if (booking.review) {
      throw new ConflictException({
        code: 'REVIEW_ALREADY_EXISTS',
        message: 'You have already reviewed this booking',
      });
    }

    const review = await this.prisma.review.create({
      data: {
        userId,
        bookingId: booking.id,
        doctorId: booking.doctorId,
        clinicId: booking.clinicId,
        rating: dto.rating,
        comment: dto.comment?.trim() || null,
      },
      select: localReviewSelect,
    });

    // Update doctor/clinic rating aggregates via internal communication
    if (booking.clinicId) {
      await this.recalculateClinicRating(booking.clinicId);
    }

    const composedList = await this.composeReviews([review]);
    return composedList[0];
  }

  async listByDoctor(doctorId: string, dto: QueryReviewsDto) {
    const page = dto.page ?? 1;
    const limit = Math.min(dto.limit ?? 10, 50);
    const skip = (page - 1) * limit;

    const where = { doctorId };

    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: localReviewSelect,
      }),
      this.prisma.review.count({ where }),
    ]);

    const composedItems = await this.composeReviews(items);

    return { items: composedItems, page, limit, total };
  }

  async listByClinic(clinicId: string, dto: QueryReviewsDto) {
    const page = dto.page ?? 1;
    const limit = Math.min(dto.limit ?? 10, 50);
    const skip = (page - 1) * limit;

    const where = { clinicId };

    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: localReviewSelect,
      }),
      this.prisma.review.count({ where }),
    ]);

    const composedItems = await this.composeReviews(items);

    return { items: composedItems, page, limit, total };
  }

  async getMyReviews(userId: string) {
    const items = await this.prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        ...localReviewSelect,
        booking: {
          select: {
            id: true,
            bookingDate: true,
            bookingTime: true,
          },
        },
      },
    });

    const composedItems = await this.composeReviews(items);

    // Reattach the booking object
    const finalized = composedItems.map((cItem, index) => ({
      ...cItem,
      booking: (items[index] as any).booking,
    }));

    return { items: finalized };
  }

  private async recalculateClinicRating(clinicId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { clinicId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    const averageRating = aggregate._avg.rating ?? 0;
    const reviewCount = aggregate._count.rating;

    // Send aggregate update request to Admin Microservice
    await this.updateClinicRatingInternal(
      clinicId,
      Math.round(averageRating * 10) / 10,
      reviewCount,
    );
  }

  private async updateClinicRatingInternal(
    clinicId: string,
    rating: number,
    reviewCount: number,
  ) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || process.env.ADMIN_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/clinics/${clinicId}/rating`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, reviewCount }),
      });
      if (!res.ok) {
        console.error('Failed to update clinic rating aggregate:', await res.text());
      }
    } catch (error) {
      console.error('Error calling admin-service update rating endpoint:', error);
    }
  }

  private async fetchUsersBatch(userIds: string[]) {
    try {
      const identityUrl = process.env.IDENTITY_SERVICE_URL || process.env.AUTH_URL || 'http://localhost:3001';
      const res = await fetch(`${identityUrl}/v1/users/internal/resolve-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds }),
      });
      if (!res.ok) return {};
      return await res.json();
    } catch (error) {
      console.error('Error batch fetching users:', error);
      return {};
    }
  }

  private async fetchAdminBatch(body: {
    clinicIds?: string[];
    doctorIds?: string[];
  }) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || process.env.ADMIN_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/resolve-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Error batch fetching admin details:', error);
      return null;
    }
  }

  private async composeReviews(items: any[]) {
    if (!items.length) return [];

    const userIds = Array.from(new Set(items.map(i => i.userId)));
    const clinicIds = Array.from(new Set(items.map(i => i.clinicId)));
    const doctorIds = Array.from(new Set(items.map(i => i.doctorId).filter(Boolean))) as string[];

    const [usersMap, adminResolved] = await Promise.all([
      this.fetchUsersBatch(userIds),
      this.fetchAdminBatch({ clinicIds, doctorIds }),
    ]);

    return items.map(item => {
      const user = usersMap[item.userId] || { id: item.userId, name: 'User', avatar: null };
      const clinic = adminResolved?.clinics?.[item.clinicId] || { id: item.clinicId, name: 'Clinic' };
      const doctor = item.doctorId && adminResolved?.doctors?.[item.doctorId] ? adminResolved.doctors[item.doctorId] : null;

      return {
        id: item.id,
        rating: item.rating,
        comment: item.comment,
        createdAt: item.createdAt,
        user,
        doctor,
        clinic,
      };
    });
  }

  async getDoctorStats(doctorId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { doctorId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    return {
      averageRating: aggregate._avg.rating ?? 0,
      reviewCount: aggregate._count.rating,
    };
  }
}

