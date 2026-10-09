import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { KetoanService } from './ketoan.service.js';
import { CreateDMLoaiMayDto } from './dto/createDmLoaiMay.dto.js';
import { UpdateDMKhoaPhongDto, UpdateDMLoaiMayDto } from './dto/update-ketoan.dto.js';
import { CreateDMKhoaPhongDto } from './dto/createDmKhoaPhong.dto.js';

@Controller('ketoan')
export class KetoanController {
  constructor(private readonly ketoanService: KetoanService) {}

  @Get('dm_loaimay')
  findAlldm_loaimay() {
    return this.ketoanService.findAllDMLoaiMay();
  }

  @Get('dm_khoaphong')
  findAlldm_khoaphong(){
    return this.ketoanService.findAllDMKhoaPhong();
  }

  @Get('dm_loaimay/:ID')
  findOnedm_loaimay(@Param('ID') ID: number) {
    return this.ketoanService.findOneDMLoaiMay(ID);
  }

  @Get('dm_khoaphong/:ID')
  findOnedm_khoaphong(@Param('ID') ID: number){
    return this.ketoanService.findOneDMKhoaPhong(ID);
  }

  @Post('dm_loaimay')
  createdm_loaimay(@Body() data: CreateDMLoaiMayDto) {
    return this.ketoanService.createDMLoaiMay(data);
  }

  @Post('dm_khoaphong')
  createdm_khoaphong(@Body() data: CreateDMKhoaPhongDto){
    return this.ketoanService.createDMKhoaPhong(data);
  }

  @Put('dm_loaimay/:ID')
  updatedm_loaimay(
    @Param('ID') ID: number,
    @Body() data: UpdateDMLoaiMayDto,
  ) {
    return this.ketoanService.updateDMLoaiMay(ID, data);
  }

  @Put('dm_khoaphong/:ID')
  updatedm_khoaphong(
    @Param('ID') ID: number,
    @Body() data: UpdateDMKhoaPhongDto,
  ){
    return this.ketoanService.updateDMKhoaPhong(ID, data);
  }

  @Delete('dm_loaimay/:ID')
  deletedm_loaimay(@Param('ID') ID: number) {
    return this.ketoanService.deleteDMLoaiMay(ID);
  }

  @Delete('dm_khoaphong/:ID')
  deletedm_khoaphong(@Param('ID') ID: number){
    return this.ketoanService.deleteDMKhoaPhong(ID);
  }
}
