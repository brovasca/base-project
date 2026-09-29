import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module.js';
import { DMLoaiMayController } from './ketoan.controller.js';
import { DMLoaiMayService } from './ketoan.service.js';
import { DMLoaiMayRepository } from './ketoan.reposity.js';

@Module({
  imports: [DatabaseModule],
  controllers: [DMLoaiMayController],
  providers: [DMLoaiMayService, DMLoaiMayRepository],
  exports: [DMLoaiMayService],
})
export class DMLoaiMayModule {}
