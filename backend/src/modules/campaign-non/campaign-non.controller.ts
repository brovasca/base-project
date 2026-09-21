import { Body, Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { IssueCampaignNonDto } from './dto/issue-campaign-non.dto.js';
import { UnlockCampaignNonDto } from './dto/unlock-campaign-non.dto.js';
import { CampaignNonService } from './campaign-non.service.js';

@Controller('campaign-non')
export class CampaignNonController {
  constructor(private readonly campaignNonService: CampaignNonService) {}

  @Post('unlock')
  unlock(@Body() data: UnlockCampaignNonDto) {
    this.campaignNonService.assertKey(data.key);
    return { message: 'Đã mở Campaign 1' };
  }

  @Get()
  findAll(@Headers('x-campaign-key') key?: string) {
    this.campaignNonService.assertKey(key);
    return this.campaignNonService.findAll();
  }

  @Post('issue')
  issue(
    @Headers('x-campaign-key') key: string | undefined,
    @Body() data: IssueCampaignNonDto,
  ) {
    return this.campaignNonService.issue(key, data.patientId);
  }

  @Delete(':patientId')
  revoke(
    @Headers('x-campaign-key') key: string | undefined,
    @Param('patientId') patientId: string,
  ) {
    return this.campaignNonService.revoke(key, patientId);
  }
}
