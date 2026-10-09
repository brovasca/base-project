import { IsString } from 'class-validator';

export class CreateDMLoaiMayDto {

  @IsString()
  TEN: string;

  @IsString()
  URL: string;
}