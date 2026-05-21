import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class SpecialtyScheduleRowDto {
  @ApiProperty({ minimum: 0, maximum: 6 })
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '08:00' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  startTime: string;

  @ApiProperty({ example: '11:30' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  endTime: string;

  @ApiProperty({ minimum: 5, maximum: 180, default: 30 })
  @IsInt()
  @Min(5)
  @Max(180)
  slotDurationMinutes: number;

  @ApiProperty({ minimum: 1, default: 1 })
  @IsInt()
  @Min(1)
  capacity: number;
}

export class UpsertSpecialtySchedulesDto {
  @ApiProperty({ type: [SpecialtyScheduleRowDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecialtyScheduleRowDto)
  schedules: SpecialtyScheduleRowDto[];
}
