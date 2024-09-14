import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCreateGoalCompletion } from '@hooks/use-create-goal-completion';
import { useGetPendingGoals } from '@hooks/use-get-pending-goals';
import { useGetSummary } from '@hooks/use-get-summary';

import { Loader } from './loader';
import { OutlineButton } from './ui/outline-button';

export function PendingGoals() {
  const { pendingGoals, isFetchingPendingGoals, refetchPendingGoals } =
    useGetPendingGoals();
  const { refetchSummary } = useGetSummary();
  const { isPendingCreateGoalsCompletion, createGoalCompletion } =
    useCreateGoalCompletion();

  async function handleCompleteGoal(goalCode: string) {
    await createGoalCompletion({ goalCode });

    await Promise.all([refetchPendingGoals(), refetchSummary()]);

    toast.success('Meta concluída com sucesso!');
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
