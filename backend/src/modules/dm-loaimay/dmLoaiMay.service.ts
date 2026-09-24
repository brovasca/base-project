import { Injectable } from '@nestjs/common';
import { DMLoaiMayRepository } from './dmLoaiMay.reposity.js';
import { UpdateDMLoaiMayDto } from './dto/update-dmloaimay.dto.js';
import { CreateDMLoaiMayDto } from './dto/create-dmloaimay.dto.js';

@Injectable()
export class DMLoaiMayService {
  constructor(private readonly dmloaimayRepository: DMLoaiMayRepository) {}

  async findAll() {
    return this.dmloaimayRepository.findAll();
  }

  async findOne(ID: number) {
    return this.dmloaimayRepository.findOne(ID);
  }

  async create(data: CreateDMLoaiMayDto) {
    const rowsAffected = await this.dmloaimayRepository.create(data);
    this.dmloaimayRepository.assertAffected(rowsAffected);
    return { message: 'Thành công' };
  }

  async update(ID: number, data: UpdateDMLoaiMayDto) {
    const rowsAffected = await this.dmloaimayRepository.update(ID, data);
    this.dmloaimayRepository.assertAffected(rowsAffected, ID);
    return { message: 'Thành công' };
  }

  async delete(ID: number) {
    const rowsAffected = await this.dmloaimayRepository.resultDelete(ID);
    this.dmloaimayRepository.assertAffected(rowsAffected, ID);
    return { message: 'Thành công' };
  }
}
