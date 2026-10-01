import { apiClient } from '../utils/Funcs';
import Apis from '../utils/Apis';
import { LoaiMayPayload } from './SessionLoaiMayReducer';

export interface KhoaPhong {
  ID: number;
  TEN: string;
  GHI_CHU: string;
  NGAYSD: string;
}

export type KhoaPhongPayload = {
  TEN: string;
  GHI_CHU: string;
};

export const getKhoaPhong = async (): Promise<KhoaPhong[]> => {
  const response = await apiClient.get<KhoaPhong[]>(Apis.API_TAILER.DM_KHOA_PHONG);
  return response.data;
};

export const createKhoaPhong = async (data: KhoaPhongPayload) => {
  const response = await apiClient.post(Apis.API_TAILER.DM_KHOA_PHONG, data);
  return response.data;
};

export const updateKhoaPhong = async (ID: number, data: KhoaPhongPayload) => {
  const response = await apiClient.put(`${Apis.API_TAILER.DM_KHOA_PHONG}/${ID}`, data);
  return response.data;
};

export const deleteKhoaPhong = async (ID: number) => {
  const response = await apiClient.delete(`${Apis.API_TAILER.DM_KHOA_PHONG}/${ID}`);
  return response.data;
};