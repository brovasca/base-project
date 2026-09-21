import { IsNotEmpty, IsString } from 'class-validator';

export class UnlockCampaignNonDto {
  @IsString()
  @IsNotEmpty()
  key!: string;
}
