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

const publicReviewSelect = {
  id: true,
  rating: true,
  comment: true,
  createdAt: true,
  user: { select: { id: true, name: true, avatar: true } },
  doctor: { select: { id: true, name: true } },
  clinic: { select: { id: true, name: true } },
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
      select: publicReviewSelect,
    });

    // Update doctor/clinic rating aggregates
    if (booking.doctorId) {
      await this.recalculateModelRating('doctor', booking.doctorId);
    }
    if (booking.clinicId) {
      await this.recalculateClinicRating(booking.clinicId);
    }

    return review;
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
        select: publicReviewSelect,
      }),
      this.prisma.review.count({ where }),
    ]);

    return { items, page, limit, total };
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
        select: publicReviewSelect,
      }),
      this.prisma.review.count({ where }),
    ]);

    return { items, page, limit, total };
  }

  async getMyReviews(userId: string) {
    const items = await this.prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        ...publicReviewSelect,
        booking: {
          select: {
            id: true,
            bookingDate: true,
            bookingTime: true,
          },
        },
      },
    });

    return { items };
  }

  private async recalculateClinicRating(clinicId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { clinicId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    const averageRating = aggregate._avg.rating ?? 0;
    const reviewCount = aggregate._count.rating;

    await this.prisma.clinic.update({
      where: { id: clinicId },
      data: {
        rating: Math.round(averageRating * 10) / 10,
        reviewCount,
      },
    });
  }

  private async recalculateModelRating(model: 'doctor', modelId: string) {
    // Doctor model does not have a rating field in current schema,
    // but we can still count reviews for future use.
    // For now this is a placeholder for when doctor rating is added.
    void model;
    void modelId;
  }
}
