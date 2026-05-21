import { PartialType } from '@nestjs/swagger';
import { CreateClinicPackageDto } from './create-clinic-package.dto';

export class UpdateClinicPackageDto extends PartialType(CreateClinicPackageDto) {}
