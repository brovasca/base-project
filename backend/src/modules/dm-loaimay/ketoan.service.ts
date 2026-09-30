import { Injectable } from '@nestjs/common';
import { KetoanRepository } from './ketoan.reposity.js';
import { UpdateDMLoaiMayDto } from './dto/update-ketoan.dto.js';
import { CreateDMLoaiMayDto } from './dto/createDmLoaiMay.dto.js';

@Injectable()
export class KetoanService {
  constructor(private readonly ketoanRepository: KetoanRepository) {}

  async findAll() {
    return this.ketoanRepository.findAll();
  }

  async findOne(ID: number) {
    return this.ketoanRepository.findOne(ID);
  }

  async create(data: CreateDMLoaiMayDto) {
    const rowsAffected = await this.ketoanRepository.create(data);
    this.ketoanRepository.assertAffected(rowsAffected);
    return { message: 'Thành công' };
  }

  async update(ID: number, data: UpdateDMLoaiMayDto) {
    const rowsAffected = await this.ketoanRepository.update(ID, data);
    this.ketoanRepository.assertAffected(rowsAffected, ID);
    return { message: 'Thành công' };
  }

  async delete(ID: number) {
    const rowsAffected = await this.ketoanRepository.resultDelete(ID);
    this.ketoanRepository.assertAffected(rowsAffected, ID);
    return { message: 'Thành công' };
  }
}
