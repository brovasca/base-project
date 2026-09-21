import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateBenhNhanDto } from './dto/create-benhnhan.dto.js';
import { UpdateBenhNhanDto } from './dto/update-benhnhan.dto.js';

export type BenhNhanRecord = {
  MA_BENH_NHAN: string;
  HO_TEN: string;
  NGAY_SINH: string;
  GIOI_TINH: string;
  SO_DIEN_THOAI: string;
  DIA_CHI: string;
  CCCD: string;
  NGHE_NGHIEP: string;
  GHI_CHU: string;
  NGAY_TAO: string;
  NGAY_CAP_NHAT: string;
};

@Injectable()
export class BenhnhanRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const resultSelect = `
        select MA_BENH_NHAN, HO_TEN, to_char(NGAY_SINH, 'DD/MM/YYYY') as NGAY_SINH, GIOI_TINH, 
        SO_DIEN_THOAI, DIA_CHI, CCCD, NGHE_NGHIEP, GHI_CHU, 
        to_char(NGAY_TAO, 'DD/MM/YYYY') as NGAY_TAO, to_char(NGAY_CAP_NHAT, 'DD/MM/YYYY') as NGAY_CAP_NHAT
        from BENH_NHAN order by ID asc
        `;
    return this.databaseService.query(resultSelect) as Promise<BenhNhanRecord[]>;
  }

  async findOne(MA_BENH_NHAN: string): Promise<BenhNhanRecord | null> {
    const resultSelect = `
        select MA_BENH_NHAN, HO_TEN, to_char(NGAY_SINH, 'DD/MM/YYYY') as NGAY_SINH, GIOI_TINH, 
        SO_DIEN_THOAI, DIA_CHI, CCCD, NGHE_NGHIEP, GHI_CHU,
        to_char(NGAY_TAO, 'DD/MM/YYYY') as NGAY_TAO, to_char(NGAY_CAP_NHAT, 'DD/MM/YYYY') as NGAY_CAP_NHAT
        from BENH_NHAN
        where MA_BENH_NHAN = :MA_BENH_NHAN
        `;
    const rows = await this.databaseService.query(resultSelect, { MA_BENH_NHAN: MA_BENH_NHAN });
    return (rows[0] as BenhNhanRecord | undefined) ?? null;
  }

  async create(data: CreateBenhNhanDto) {
    const resultInsert = `
        insert into BENH_NHAN (MA_BENH_NHAN, HO_TEN, NGAY_SINH, GIOI_TINH, SO_DIEN_THOAI, DIA_CHI, CCCD, NGHE_NGHIEP, GHI_CHU)
        values (:MA_BENH_NHAN, :HO_TEN, to_date(:NGAY_SINH, 'DD/MM/YYYY'), 
        :GIOI_TINH, :SO_DIEN_THOAI, :DIA_CHI, :CCCD, :NGHE_NGHIEP, :GHI_CHU)
        `;
    const result = await this.databaseService.execute(resultInsert, {
      MA_BENH_NHAN: data.MA_BENH_NHAN,
      HO_TEN: data.HO_TEN,
      NGAY_SINH: data.NGAY_SINH,
      GIOI_TINH: data.GIOI_TINH,
      SO_DIEN_THOAI: data.SO_DIEN_THOAI,
      DIA_CHI: data.DIA_CHI,
      CCCD: data.CCCD,
      NGHE_NGHIEP: data.NGHE_NGHIEP,
      GHI_CHU: data.GHI_CHU,
    });
    return result.rowsAffected ?? 0;
  }

  async update(MA_BENH_NHAN: string, data: UpdateBenhNhanDto) {
    const resultUpdate = `
        update BENH_NHAN 
        set HO_TEN = :HO_TEN, NGAY_SINH = to_date(:NGAY_SINH, 'DD/MM/YYYY'), GIOI_TINH = :GIOI_TINH, SO_DIEN_THOAI = :SO_DIEN_THOAI, 
        DIA_CHI = :DIA_CHI, CCCD = :CCCD, NGHE_NGHIEP = :NGHE_NGHIEP, GHI_CHU = :GHI_CHU,
        NGAY_CAP_NHAT = SYSDATE
        where MA_BENH_NHAN = :MA_BENH_NHAN
        `;
    const result = await this.databaseService.execute(resultUpdate, {
      MA_BENH_NHAN: MA_BENH_NHAN,
      HO_TEN: data.HO_TEN,
      NGAY_SINH: data.NGAY_SINH,
      GIOI_TINH: data.GIOI_TINH,
      SO_DIEN_THOAI: data.SO_DIEN_THOAI,
      DIA_CHI: data.DIA_CHI,
      CCCD: data.CCCD,
      NGHE_NGHIEP: data.NGHE_NGHIEP,
      GHI_CHU: data.GHI_CHU,
    });
    return result.rowsAffected ?? 0;
  }

  async resultDelete(MA_BENH_NHAN: string) {
    const resultDelete = `
        delete from BENH_NHAN where MA_BENH_NHAN = :MA_BENH_NHAN
        `;
    const result = await this.databaseService.execute(resultDelete, {
      MA_BENH_NHAN: MA_BENH_NHAN,
    });
    return result.rowsAffected ?? 0;
  }

  assertAffected(rowsAffected: number, MA_BENH_NHAN?: string) {
    if (rowsAffected < 1) {
      throw new NotFoundException(
        MA_BENH_NHAN != null ? `Không tìm thấy bệnh nhân ${MA_BENH_NHAN}` : 'Không ghi được dữ liệu',
      );
    }
  }
}