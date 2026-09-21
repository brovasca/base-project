import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { BenhnhanService } from '../benh-nhan/benhnhan.service.js';

export type CampaignNonIssue = {
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
  NGAY_NHAN: string;
};

@Injectable()
export class CampaignNonService {
  private readonly storagePath = join(process.cwd(), 'data', 'campaign-non-issues.json');
  private writeQueue: Promise<void> = Promise.resolve();

  constructor(
    private readonly configService: ConfigService,
    private readonly benhnhanService: BenhnhanService,
  ) {}

  assertKey(key: string | undefined) {
    const expectedKey = this.configService.get<string>('CAMPAIGN_NON_KEY') ?? 'campaign1';
    if (!key || !this.safeEqual(key, expectedKey)) {
      // Trả về 403 vì đây là lỗi key mở Campaign 1.
      throw new ForbiddenException('Key Campaign 1 không hợp lệ');
    }
  }

  async findAll() {
    const issues = await this.readIssues();
    return issues.sort((a, b) => b.NGAY_NHAN.localeCompare(a.NGAY_NHAN));
  }

  async issue(key: string | undefined, patientId: string) {
    this.assertKey(key);
    const patient = await this.benhnhanService.findOne(patientId);
    if (!patient) {
      throw new NotFoundException(`Không tìm thấy bệnh nhân ${patientId}`);
    }

    return this.exclusively(async () => {
      const issues = await this.readIssues();
      if (issues.some((issue) => issue.MA_BENH_NHAN === patientId)) {
        throw new ConflictException(`Bệnh nhân ${patientId} đã được phát nón`);
      }

      const issue: CampaignNonIssue = {
        MA_BENH_NHAN: patient.MA_BENH_NHAN,
        HO_TEN: patient.HO_TEN,
        NGAY_SINH: patient.NGAY_SINH,
        GIOI_TINH: patient.GIOI_TINH,
        SO_DIEN_THOAI: patient.SO_DIEN_THOAI,
        DIA_CHI: patient.DIA_CHI,
        CCCD: patient.CCCD,
        NGHE_NGHIEP: patient.NGHE_NGHIEP,
        GHI_CHU: patient.GHI_CHU,
        NGAY_TAO: patient.NGAY_TAO,
        NGAY_CAP_NHAT: patient.NGAY_CAP_NHAT,
        // Lưu ngoài Oracle để không làm thay đổi dữ liệu bệnh nhân gốc.
        NGAY_NHAN: new Date().toISOString(),
      };
      issues.push(issue);
      await this.saveIssues(issues);
      return issue;
    });
  }

  async revoke(key: string | undefined, patientId: string) {
    this.assertKey(key);
    return this.exclusively(async () => {
      const issues = await this.readIssues();
      const remainingIssues = issues.filter((issue) => issue.MA_BENH_NHAN !== patientId);
      if (remainingIssues.length === issues.length) {
        throw new NotFoundException(`Bệnh nhân ${patientId} chưa được phát nón`);
      }
      await this.saveIssues(remainingIssues);
      return { message: `Đã thu hồi phát nón của bệnh nhân ${patientId}` };
    });
  }

  private async readIssues(): Promise<CampaignNonIssue[]> {
    try {
      const content = await readFile(this.storagePath, 'utf8');
      const parsed: unknown = JSON.parse(content);
      return Array.isArray(parsed) ? parsed as CampaignNonIssue[] : [];
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async saveIssues(issues: CampaignNonIssue[]) {
    await mkdir(dirname(this.storagePath), { recursive: true });
    const temporaryPath = `${this.storagePath}.tmp`;
    await writeFile(temporaryPath, JSON.stringify(issues, null, 2), 'utf8');
    await rename(temporaryPath, this.storagePath);
  }

  private async exclusively<T>(action: () => Promise<T>): Promise<T> {
    const previous = this.writeQueue;
    let release: () => void = () => undefined;
    this.writeQueue = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previous;
    try {
      return await action();
    } finally {
      release();
    }
  }

  private safeEqual(actual: string, expected: string) {
    const actualBuffer = Buffer.from(actual);
    const expectedBuffer = Buffer.from(expected);
    return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
  }
}
