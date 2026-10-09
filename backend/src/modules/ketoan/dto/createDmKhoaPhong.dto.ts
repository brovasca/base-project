import { IsString } from "class-validator";


export class CreateDMKhoaPhongDto{
    @IsString()
    TEN: string;

    @IsString()
    GHI_CHU: string;
}