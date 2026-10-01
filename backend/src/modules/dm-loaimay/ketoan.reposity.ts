import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateDMLoaiMayDto } from './dto/createDmLoaiMay.dto.js';
import { UpdateDMKhoaPhongDto, UpdateDMLoaiMayDto } from './dto/update-ketoan.dto.js';
import { CreateDMKhoaPhongDto } from './dto/createDmKhoaPhong.dto.js';

export type DMLoaiMayRecord = {
  ID: number;
  TEN: string;
  URL: string;
  NGAYSD: string;
};

export type DMKhoaPhongRecord = {
  ID: number;
  TEN: string;
  GHI_CHU: string;
  NGAYSD: string;
};

@Injectable()
export class KetoanRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllLoaiMay() {
    const resultSelect = `
        select ID, TEN, URL, to_char(NGAYSD, 'DD/MM/YYYY') as NGAYSD
        from DM_LOAI_MAY order by ID asc
        `;
    return this.databaseService.query(resultSelect) as Promise<DMLoaiMayRecord[]>;
  }

  async findAllKhoaPhong(){
    const resultSelect = `
      select ID, TEN, GHI_CHU, to_char(NGAYSD, 'DD/MM/YYYY') as NGAYSD
      from DM_KHOA_PHONG order by ID asc
    `;
    return this.databaseService.query(resultSelect) as Promise<DMKhoaPhongRecord[]>;
  }

  async findOneLoaiMay(ID: number): Promise<DMLoaiMayRecord | null> {
    const resultSelect = `
        select ID, TEN, URL, to_char(NGAYSD, 'DD/MM/YYYY') as NGAYSD
        from DM_LOAI_MAY order by ID asc
        where ID = :ID
        `;
    const rows = await this.databaseService.query(resultSelect, { ID: ID });
    return (rows[0] as DMLoaiMayRecord | undefined) ?? null;
  }

  async findOneKhoaPhong(ID: number): Promise<DMKhoaPhongRecord | null>{
    const resultSelect = `
      select ID, TEN, GHI_CHU, to_char(NGAYSD, 'DD/MM/YYYY') as NGAYSD
      from DM_KHOA_PHONG order by ID asc
      where ID = :ID
    `;
    const rows = await this.databaseService.query(resultSelect, {ID: ID});
    return (rows[0] as DMKhoaPhongRecord | undefined) ?? null;
  }

  async createLoaiMay(data: CreateDMLoaiMayDto) {
    const resultInsert = `
        insert into DM_LOAI_MAY (TEN, URL)
        values (:TEN, :URL)
        `;
    const result = await this.databaseService.execute(resultInsert, {
      TEN: data.TEN,
      URL: data.URL,
    });
    return result.rowsAffected ?? 0;
  }

  async createKhoaPhong(data: CreateDMKhoaPhongDto){
    const resultInsert = `
      insert into DM_KHOA_PHONG (TEN, GHI_CHU)
      values (:TEN, :GHI_CHU)
    `;
    const result = await this.databaseService.execute(resultInsert, {
      TEN: data.TEN,
      GHI_CHU: data.GHI_CHU,
    });
    return result.rowsAffected ?? 0;
  }

  async updateLoaiMay(ID: number, data: UpdateDMLoaiMayDto) {
    const resultUpdate = `
        update DM_LOAI_MAY 
        set TEN = :TEN, URL = :URL, NGAYSD = SYSDATE
        where ID = :ID
        `;
    const result = await this.databaseService.execute(resultUpdate, {
      ID,
      TEN: data.TEN,
      URL: data.URL,
    });
    return result.rowsAffected ?? 0;
  }

  async updateKhoaPhong(ID: number, data: UpdateDMKhoaPhongDto){
    const resultUpdate = `
      update DM_KHOA_PHONG
      set TEN = :TEN, GHI_CHU = :GHI_CHU, NGAYSD = SYSDATE
      where ID = :ID
    `;
    const result = await this.databaseService.execute(resultUpdate, {
      ID,
      TEN: data.TEN,
      GHI_CHU: data.GHI_CHU,
      });
      return result.rowsAffected ?? 0;
  }

  async deleteLoaiMay(ID: number) {
    const resultDelete = `
        delete from DM_LOAI_MAY where ID = :ID
        `;
    const result = await this.databaseService.execute(resultDelete, {
      ID: ID,
    });
    return result.rowsAffected ?? 0;
  }

  async deleteKhoaPhong(ID: number){
    const resultDelete = `
      delete from DM_KHOA_PHONG where ID = :ID
    `;
    const result = await this.databaseService.execute(resultDelete, {
      ID: ID,
    });
    return result.rowsAffected ?? 0;
  }

  assertAffected(rowsAffected: number, ID?: number) {
    if (rowsAffected < 1) {
      throw new NotFoundException(
        ID != null ? `Không tìm thấy loại máy ${ID}` : 'Không ghi được dữ liệu',
      );
    }
  }
}