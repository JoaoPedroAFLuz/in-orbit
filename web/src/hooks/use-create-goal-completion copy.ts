import { useMutation } from '@tanstack/react-query';

import { createGoal } from '@services/create-goal';

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export function useCreateGoal() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: async (data: CreateGoalRequest) => await createGoal(data),
  });

  return {
    isPendingCreateGoal: isPending,
    createGoalError: error,
    createGoal: mutateAsync,
  };
}
