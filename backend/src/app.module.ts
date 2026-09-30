import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { BenhnhanModule } from './modules/benh-nhan/benhnhan.module.js';
import { CampaignNonModule } from './modules/campaign-non/campaign-non.module.js';
import { KetoanModule } from './modules/dm-loaimay/ketoan.module.js';

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
    KetoanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
