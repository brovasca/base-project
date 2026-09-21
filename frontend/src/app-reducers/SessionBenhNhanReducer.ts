import { apiClient } from '../utils/Funcs';
import Apis from '../utils/Apis';

export interface BenhNhan {
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
}

export type BenhNhanPayload = {
  MA_BENH_NHAN: string;
  HO_TEN: string;
  NGAY_SINH: string;
  GIOI_TINH: string;
  SO_DIEN_THOAI: string;
  DIA_CHI: string;
  CCCD: string;
  NGHE_NGHIEP: string;
  GHI_CHU: string;
};

export const getBenhNhan = async (): Promise<BenhNhan[]> => {
  const response = await apiClient.get<BenhNhan[]>(Apis.API_TAILER.BENH_NHAN);
  return response.data;
};

export const createBenhNhan = async (data: BenhNhanPayload) => {
  const response = await apiClient.post(Apis.API_TAILER.BENH_NHAN, data);
  return response.data;
};

export const updateBenhNhan = async (MA_BENH_NHAN: string, data: BenhNhanPayload) => {
  const response = await apiClient.put(`${Apis.API_TAILER.BENH_NHAN}/${MA_BENH_NHAN}`, data);
  return response.data;
};

export const deleteBenhNhan = async (MA_BENH_NHAN: string) => {
  const response = await apiClient.delete(`${Apis.API_TAILER.BENH_NHAN}/${MA_BENH_NHAN}`);
  return response.data;
};