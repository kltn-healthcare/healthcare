import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class RescheduleBookingDto {
    @ApiProperty({ description: 'YYYY-MM-DD' })
    @IsDateString()
    bookingDate: string;

    @ApiProperty({ example: '10:00' })
    @IsString()
    @IsNotEmpty()
    bookingTime: string;
}
