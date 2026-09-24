import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateDMLoaiMayDto {

  @IsString()
  TEN: string;

  @IsString()
  URL: string;
}