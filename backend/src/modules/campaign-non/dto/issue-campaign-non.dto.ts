import { IsNotEmpty, IsString } from 'class-validator';

export class IssueCampaignNonDto {
  @IsString()
  @IsNotEmpty()
  patientId!: string;
}
