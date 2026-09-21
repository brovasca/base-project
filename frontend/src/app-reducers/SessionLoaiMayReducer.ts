import { apiClient } from '../utils/Funcs';
import Apis from '../utils/Apis';

export interface LoaiMay {
  ID: number;
  TEN: string;
  IMG: string;
  NGAYSD: string;
}

export type LoaiMayPayload = {
  TEN: string;
  IMG: string;
};

export const getLoaiMay = async (): Promise<LoaiMay[]> => {
  const response = await apiClient.get<LoaiMay[]>(Apis.API_TAILER.DM_LOAI_MAY);
  return response.data;
};

export const createLoaiMay = async (data: LoaiMayPayload) => {
  const response = await apiClient.post(Apis.API_TAILER.DM_LOAI_MAY, data);
  return response.data;
};

export const updateLoaiMay = async (ID: number, data: LoaiMayPayload) => {
  const response = await apiClient.put(`${Apis.API_TAILER.DM_LOAI_MAY}/${ID}`, data);
  return response.data;
};

export const deleteLoaiMay = async (ID: number) => {
  const response = await apiClient.delete(`${Apis.API_TAILER.DM_LOAI_MAY}/${ID}`);
  return response.data;
};