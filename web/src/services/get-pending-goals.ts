import type { PendingGoalDTO } from '@dto/pending-goal';
import { httpClient } from '@libs/axios';

export async function getPendingGoals(): Promise<PendingGoalDTO[]> {
  const { data } = await httpClient.get<PendingGoalDTO[]>('/pending-goals');

  return data;
}
