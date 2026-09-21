import { Injectable } from '@nestjs/common';
import { BenhnhanRepository } from './benhnhan.repository.js';
import { CreateBenhNhanDto } from './dto/create-benhnhan.dto.js';
import { UpdateBenhNhanDto } from './dto/update-benhnhan.dto.js';

@Injectable()
export class BenhnhanService {
  constructor(private readonly benhnhanRepository: BenhnhanRepository) {}

  async findAll() {
    return this.benhnhanRepository.findAll();
  }

  async findOne(MA_BENH_NHAN: string) {
    return this.benhnhanRepository.findOne(MA_BENH_NHAN);
  }

  async create(data: CreateBenhNhanDto) {
    const rowsAffected = await this.benhnhanRepository.create(data);
    this.benhnhanRepository.assertAffected(rowsAffected);
    return { message: 'Thành công' };
  }

  async update(MA_BENH_NHAN: string, data: UpdateBenhNhanDto) {
    const rowsAffected = await this.benhnhanRepository.update(MA_BENH_NHAN, data);
    this.benhnhanRepository.assertAffected(rowsAffected, MA_BENH_NHAN);
    return { message: 'Thành công' };
  }

  async delete(MA_BENH_NHAN: string) {
    const rowsAffected = await this.benhnhanRepository.resultDelete(MA_BENH_NHAN);
    this.benhnhanRepository.assertAffected(rowsAffected, MA_BENH_NHAN);
    return { message: 'Thành công' };
  }
}
