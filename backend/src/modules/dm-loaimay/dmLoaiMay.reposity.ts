import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateDMLoaiMayDto } from './dto/create-dmloaimay.dto.js';
import { UpdateDMLoaiMayDto } from './dto/update-dmloaimay.dto.js';

export type DMLoaiMayRecord = {
  ID: number;
  TEN: string;
  URL: string;
  NGAYSD: string;
};

@Injectable()
export class DMLoaiMayRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const resultSelect = `
        select ID, TEN, URL, to_char(NGAYSD, 'DD/MM/YYYY') as NGAYSD
        from DM_LOAI_MAY order by ID asc
        `;
    return this.databaseService.query(resultSelect) as Promise<DMLoaiMayRecord[]>;
  }

  async findOne(ID: number): Promise<DMLoaiMayRecord | null> {
    const resultSelect = `
        select ID, TEN, URL, to_char(NGAYSD, 'DD/MM/YYYY') as NGAYSD
        from DM_LOAI_MAY order by ID asc
        where ID = :ID
        `;
    const rows = await this.databaseService.query(resultSelect, { ID: ID });
    return (rows[0] as DMLoaiMayRecord | undefined) ?? null;
  }

  async create(data: CreateDMLoaiMayDto) {
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

  async update(ID: number, data: UpdateDMLoaiMayDto) {
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

  async resultDelete(ID: number) {
    const resultDelete = `
        delete from DM_LOAI_MAY where ID = :ID
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