import { Injectable } from '@nestjs/common';
import { KetoanRepository } from './ketoan.reposity.js';
import { UpdateDMKhoaPhongDto, UpdateDMLoaiMayDto } from './dto/update-ketoan.dto.js';
import { CreateDMLoaiMayDto } from './dto/createDmLoaiMay.dto.js';
import { CreateDMKhoaPhongDto } from './dto/createDmKhoaPhong.dto.js';

@Injectable()
export class KetoanService {
  constructor(private readonly ketoanRepository: KetoanRepository) {}

  async findAllDMLoaiMay() {
    return this.ketoanRepository.findAllLoaiMay();
  }

  async findAllDMKhoaPhong(){
    return this.ketoanRepository.findAllKhoaPhong();
  }

  async findOneDMLoaiMay(ID: number) {
    return this.ketoanRepository.findOneLoaiMay(ID);
  }

  async findOneDMKhoaPhong(ID: number){
    return this.ketoanRepository.findOneKhoaPhong(ID);
  }

  async createDMLoaiMay(data: CreateDMLoaiMayDto) {
    const rowsAffected = await this.ketoanRepository.createLoaiMay(data);
    this.ketoanRepository.assertAffected(rowsAffected);
    return { message: 'Thành công' };
  }

  async createDMKhoaPhong(data: CreateDMKhoaPhongDto){
    const rowsAffected = await this.ketoanRepository.createKhoaPhong(data);
    this.ketoanRepository.assertAffected(rowsAffected);
    return {message: 'success'};
  }

  async updateDMLoaiMay(ID: number, data: UpdateDMLoaiMayDto) {
    const rowsAffected = await this.ketoanRepository.updateLoaiMay(ID, data);
    this.ketoanRepository.assertAffected(rowsAffected, ID);
    return { message: 'Thành công' };
  }

  async updateDMKhoaPhong(ID: number, data: UpdateDMKhoaPhongDto){
    const rowsAffected = await this.ketoanRepository.updateKhoaPhong(ID, data);
    this.ketoanRepository.assertAffected(rowsAffected, ID);
    return{message: 'success'};
  }

  async deleteDMLoaiMay(ID: number) {
    const rowsAffected = await this.ketoanRepository.deleteLoaiMay(ID);
    this.ketoanRepository.assertAffected(rowsAffected, ID);
    return { message: 'Thành công' };
  }

  async deleteDMKhoaPhong(ID: number){
    const rowsAffected = await this.ketoanRepository.deleteKhoaPhong(ID);
    this.ketoanRepository.assertAffected(rowsAffected, ID);
    return {message: 'success'};
  }
}
