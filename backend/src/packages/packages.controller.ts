import { Controller, Get, Param, Query } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { QueryPackagesDto } from './dto/query-packages.dto';
import { QueryPackageAvailabilityDto } from './dto/query-package-availability.dto';

@Controller({ path: 'packages', version: '1' })
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @Public()
  async findAll(@Query() query: QueryPackagesDto) {
    const result = await this.packagesService.findAll(query);
    return {
      success: true,
      data: result.items,
      items: result.items, // Some generic frontend maps might expect items
      page: result.page,
      limit: result.limit,
      total: result.total,
    };
  }

  @Get('popular')
  @Public()
  async findPopular() {
    const items = await this.packagesService.findPopular();
    return {
      success: true,
      data: items,
      items: items,
    };
  }

  @Get(':id/availability')
  @Public()
  async availability(
    @Param('id') id: string,
    @Query() query: QueryPackageAvailabilityDto,
  ) {
    return this.packagesService.getAvailability(id, query.date);
  }

  @Get('category/:category')
  @Public()
  async findByCategory(@Param('category') category: string) {
    const items = await this.packagesService.findByCategory(category);
    return {
      success: true,
      data: items,
      items: items,
    };
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const item = await this.packagesService.findOne(id);
    return {
      success: true,
      data: item,
      item: item,
    };
  }
}
