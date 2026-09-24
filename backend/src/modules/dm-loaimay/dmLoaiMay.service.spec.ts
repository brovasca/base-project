import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DMLoaiMayService } from './dmLoaiMay.service.js';
import { DMLoaiMayRepository } from './dmLoaiMay.reposity.js';

describe('DMLoaiMayService', () => {
  let service: DMLoaiMayService;
  const repository = {
    findAll: async () => [],
    create: async () => 1,
    update: async () => 0,
    resultDelete: async () => 0,
    assertAffected: DMLoaiMayRepository.prototype.assertAffected,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DMLoaiMayService,
        { provide: DMLoaiMayRepository, useValue: repository },
      ],
    }).compile();
    service = module.get(DMLoaiMayService);
  });

  it('throws 404 when update affects no rows', async () => {
    await expect(
      service.update(99, {
        TEN: 'uhdnd',
        URL: 'rrr'
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws 404 when delete affects no rows', async () => {
    await expect(service.delete(99)).rejects.toBeInstanceOf(NotFoundException);
  });
});
