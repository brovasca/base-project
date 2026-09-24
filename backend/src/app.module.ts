import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { BenhnhanModule } from './modules/benh-nhan/benhnhan.module.js';
import { CampaignNonModule } from './modules/campaign-non/campaign-non.module.js';
import { DMLoaiMayModule } from './modules/dm-loaimay/dmLoaiMay.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      override: true,
    }),
    DatabaseModule,
    BenhnhanModule,
    CampaignNonModule,
    DMLoaiMayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
