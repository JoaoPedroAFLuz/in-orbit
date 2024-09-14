import { httpClient } from '@libs/axios';
interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  await httpClient.post('/goals', {
    title,
    desiredWeeklyFrequency,
  });
}
