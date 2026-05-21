import { PartialType } from '@nestjs/swagger';
import { CreatePackageAdminDto } from './create-package-admin.dto';

export class UpdatePackageAdminDto extends PartialType(CreatePackageAdminDto) {}
