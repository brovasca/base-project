import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { KetoanService } from './ketoan.service.js';
import { CreateDMLoaiMayDto } from './dto/createDmLoaiMay.dto.js';
import { UpdateDMLoaiMayDto } from './dto/update-ketoan.dto.js';

@Controller('ketoan')
export class KetoanController {
  constructor(private readonly ketoanService: KetoanService) {}

  @Get()
  findAll() {
    return this.ketoanService.findAll();
  }

  @Get(':ID')
  findOne(@Param('ID') ID: number) {
    return this.ketoanService.findOne(ID);
  }

  @Post()
  create(@Body() data: CreateDMLoaiMayDto) {
    return this.ketoanService.create(data);
  }

  @Put(':ID')
  update(
    @Param('ID') ID: number,
    @Body() data: UpdateDMLoaiMayDto,
  ) {
    return this.ketoanService.update(ID, data);
  }

  @Delete(':ID')
  delete(@Param('ID') ID: number) {
    return this.ketoanService.delete(ID);
  }

}
