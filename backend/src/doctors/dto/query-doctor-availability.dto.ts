import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class QueryDoctorAvailabilityDto {
    @ApiProperty({ description: 'YYYY-MM-DD' })
    @IsDateString()
    date: string;
}
