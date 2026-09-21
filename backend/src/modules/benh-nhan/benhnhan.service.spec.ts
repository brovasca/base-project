import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BenhnhanRepository } from './benhnhan.repository.js';
import { BenhnhanService } from './benhnhan.service.js';

describe('BenhnhanService', () => {
  let service: BenhnhanService;
  const repository = {
    findAll: async () => [],
    create: async () => 1,
    update: async () => 0,
    resultDelete: async () => 0,
    assertAffected: BenhnhanRepository.prototype.assertAffected,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BenhnhanService,
        { provide: BenhnhanRepository, useValue: repository },
      ],
    }).compile();
    service = module.get(BenhnhanService);
  });

  it('throws 404 when update affects no rows', async () => {
    await expect(
      service.update('99', {
        MA_BENH_NHAN: 'BN000000',
        HO_TEN: 'A',
        NGAY_SINH: '01/01/2000',
        GIOI_TINH: 'Nam',
        SO_DIEN_THOAI: '0900000000',
        DIA_CHI: 'AFAFLNACLNA',
        CCCD: '1212121212',
        NGHE_NGHIEP: 'nnoenfaf',
        GHI_CHU: 'AIUFNA',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws 404 when delete affects no rows', async () => {
    await expect(service.delete('99')).rejects.toBeInstanceOf(NotFoundException);
  });
});
