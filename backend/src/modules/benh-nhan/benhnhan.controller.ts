import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BenhnhanService } from './benhnhan.service.js';
import { CreateBenhNhanDto } from './dto/create-benhnhan.dto.js';
import { UpdateBenhNhanDto } from './dto/update-benhnhan.dto.js';

@Controller('benhnhan')
export class BenhnhanController {
  constructor(private readonly benhnhanService: BenhnhanService) {}

  @Get()
  findAll() {
    return this.benhnhanService.findAll();
  }

  @Get(':MA_BENH_NHAN')
  findOne(@Param('MA_BENH_NHAN') MA_BENH_NHAN: string) {
    return this.benhnhanService.findOne(MA_BENH_NHAN);
  }

  @Post()
  create(@Body() data: CreateBenhNhanDto) {
    return this.benhnhanService.create(data);
  }

  @Put(':MA_BENH_NHAN')
  update(
    @Param('MA_BENH_NHAN') MA_BENH_NHAN: string,
    @Body() data: UpdateBenhNhanDto,
  ) {
    return this.benhnhanService.update(MA_BENH_NHAN, data);
  }

  @Delete(':MA_BENH_NHAN')
  delete(@Param('MA_BENH_NHAN') MA_BENH_NHAN: string) {
    return this.benhnhanService.delete(MA_BENH_NHAN);
  }
}
