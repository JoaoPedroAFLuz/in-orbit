import { useMutation } from '@tanstack/react-query';

import { createGoalCompletion } from '@services/create-goal-completion';

interface CreateGoalCompletionRequest {
  goalCode: string;
}

export function useCreateGoalCompletion() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: async ({ goalCode }: CreateGoalCompletionRequest) =>
      await createGoalCompletion({ goalCode }),
  });

  return {
    isPendingCreateGoalsCompletion: isPending,
    createGoalCompletionError: error,
    createGoalCompletion: mutateAsync,
  };
}
