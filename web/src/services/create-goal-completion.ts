import { httpClient } from '@libs/axios';

interface CompleteGoalRequest {
  goalCode: string;
}

export async function createGoalCompletion({ goalCode }: CompleteGoalRequest) {
  await httpClient.post(`/goals/${goalCode}/completions`, {
    goalCode,
  });
}
