import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module.js';
import { KetoanController } from './ketoan.controller.js';
import { KetoanService } from './ketoan.service.js';
import { KetoanRepository } from './ketoan.reposity.js';

@Module({
  imports: [DatabaseModule],
  controllers: [KetoanController],
  providers: [KetoanService, KetoanRepository],
  exports: [KetoanService],
})
export class KetoanModule {}
