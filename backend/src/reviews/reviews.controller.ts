import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewsDto } from './dto/query-reviews.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller({ path: 'reviews', version: '1' })
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth('JWT')
  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(user.id, dto);
  }

  @ApiBearerAuth('JWT')
  @Get('me')
  myReviews(@CurrentUser() user: JwtUser) {
    return this.reviewsService.getMyReviews(user.id);
  }

  @Public()
  @Get('doctor/:doctorId')
  byDoctor(
    @Param('doctorId') doctorId: string,
    @Query() query: QueryReviewsDto,
  ) {
    return this.reviewsService.listByDoctor(doctorId, query);
  }

  @Public()
  @Get('clinic/:clinicId')
  byClinic(
    @Param('clinicId') clinicId: string,
    @Query() query: QueryReviewsDto,
  ) {
    return this.reviewsService.listByClinic(clinicId, query);
  }
}
