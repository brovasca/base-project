import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DMLoaiMayService } from './dmLoaiMay.service.js';
import { CreateDMLoaiMayDto } from './dto/create-dmloaimay.dto.js';
import { UpdateDMLoaiMayDto } from './dto/update-dmloaimay.dto.js';

@Controller('dmloaimay')
export class DMLoaiMayController {
  constructor(private readonly dmloaimayService: DMLoaiMayService) {}

  @Get()
  findAll() {
    return this.dmloaimayService.findAll();
  }

  @Get(':ID')
  findOne(@Param('ID') ID: number) {
    return this.dmloaimayService.findOne(ID);
  }

  @Post()
  create(@Body() data: CreateDMLoaiMayDto) {
    return this.dmloaimayService.create(data);
  }

  @Put(':ID')
  update(
    @Param('ID') ID: number,
    @Body() data: UpdateDMLoaiMayDto,
  ) {
    return this.dmloaimayService.update(ID, data);
  }

  @Delete(':ID')
  delete(@Param('ID') ID: number) {
    return this.dmloaimayService.delete(ID);
  }
}
