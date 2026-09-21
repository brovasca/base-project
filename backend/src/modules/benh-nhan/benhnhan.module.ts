import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module.js';
import { BenhnhanController } from './benhnhan.controller.js';
import { BenhnhanRepository } from './benhnhan.repository.js';
import { BenhnhanService } from './benhnhan.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [BenhnhanController],
  providers: [BenhnhanService, BenhnhanRepository],
  exports: [BenhnhanService],
})
export class BenhnhanModule {}
