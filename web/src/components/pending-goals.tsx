import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCreateGoalCompletion } from '@hooks/use-create-goal-completion';
import { useGetPendingGoals } from '@hooks/use-get-pending-goals';
import { useGetSummary } from '@hooks/use-get-summary';

import { AxiosError } from 'axios';
import { Loader } from './loader';
import { OutlineButton } from './ui/outline-button';

export function PendingGoals() {
  const { refetchSummary } = useGetSummary();
  const {
    isPendingCreateGoalsCompletion,
    createGoalCompletionError,
    createGoalCompletion,
  } = useCreateGoalCompletion();
  const { pendingGoals, isFetchingPendingGoals, refetchPendingGoals } =
    useGetPendingGoals();

  async function handleCompleteGoal(goalCode: string) {
    try {
      await createGoalCompletion({ goalCode });

      await Promise.all([refetchPendingGoals(), refetchSummary()]);

      toast.success('Meta concluída com sucesso!');
    } catch {
      if (createGoalCompletionError instanceof AxiosError) {
        toast.error(createGoalCompletionError.response?.data.message);
      }
    }
  }

  if (isFetchingPendingGoals) {
    return (
      <div className="h-9">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {!pendingGoals && (
        <span className="text-zinc-400 text-xs">
          Você ainda não cadastrou nenhuma meta.
        </span>
      )}

      {pendingGoals?.map(goal => (
        <div key={goal.code}>
          <OutlineButton
            disabled={
              goal.completionCount >= goal.desiredWeeklyFrequency ||
              isPendingCreateGoalsCompletion
            }
            onClick={() => handleCompleteGoal(goal.code)}
          >
            <Plus className="size-4" />

            <span>{goal.title}</span>
          </OutlineButton>
        </div>
      ))}
    </div>
  );
}
