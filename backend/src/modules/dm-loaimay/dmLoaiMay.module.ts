import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module.js';
import { DMLoaiMayController } from './dmLoaiMay.controller.js';
import { DMLoaiMayService } from './dmLoaiMay.service.js';
import { DMLoaiMayRepository } from './dmLoaiMay.reposity.js';

@Module({
  imports: [DatabaseModule],
  controllers: [DMLoaiMayController],
  providers: [DMLoaiMayService, DMLoaiMayRepository],
  exports: [DMLoaiMayService],
})
export class DMLoaiMayModule {}
