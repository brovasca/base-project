import { Module } from '@nestjs/common';
import { BenhnhanModule } from '../benh-nhan/benhnhan.module.js';
import { CampaignNonController } from './campaign-non.controller.js';
import { CampaignNonService } from './campaign-non.service.js';

@Module({
  imports: [BenhnhanModule],
  controllers: [CampaignNonController],
  providers: [CampaignNonService],
})
export class CampaignNonModule {}
