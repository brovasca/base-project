import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateBenhNhanDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9]{6,20}$/,{
    message: 'Mã bệnh nhân ko để trống',
  })
  MA_BENH_NHAN: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2,{
    message: 'It nhat 2 ky tu'
  })
  @MaxLength(100,{
    message: 'Ko vuot qua 100 ky tu'
  })
  @Matches(/^[\p{L}\s]+$/u,{
    message: 'Chua chu cai va dau cach'
  })
  HO_TEN: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,{
    message: 'Ngay sinh co dang DD/MM/YYYY'
  })
  NGAY_SINH: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(Nam|Nữ|Khác)$/)
  GIOI_TINH: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/)
  SO_DIEN_THOAI: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  DIA_CHI: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{12}$/,{
    message: '12 ky tu'
  })
  CCCD: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[\p{L}\s]+$/u,{
    message: 'Chu cai va dau cach'
  })
  NGHE_NGHIEP: string;

  @IsString()
  @MaxLength(500)
  GHI_CHU: string;
}