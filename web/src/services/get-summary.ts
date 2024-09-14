import type { SummaryDTO } from '@dto/summary';
import { httpClient } from '@libs/axios';

export async function getSummary() {
  const { data } = await httpClient.get<SummaryDTO>('/summary');

  return data;
}
