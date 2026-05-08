import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { QueryDoctorAvailabilityDto } from './dto/query-doctor-availability.dto';
import { DoctorsService } from './doctors.service';
import { QueryDoctorsDto } from './dto/query-doctors.dto';

@ApiTags('Doctors')
@Controller({ path: 'doctors', version: '1' })
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) { }

  @Public()
  @Get()
  list(@Query() query: QueryDoctorsDto) {
    return this.doctorsService.list(query);
  }

  @Public()
  @Get(':id')
  detail(@Param('id') id: string) {
    return this.doctorsService.getById(id);
  }

  @Public()
  @Get(':id/availability')
  availability(
    @Param('id') doctorId: string,
    @Query() query: QueryDoctorAvailabilityDto,
  ) {
    return this.doctorsService.getAvailability(doctorId, query);
  }
}

