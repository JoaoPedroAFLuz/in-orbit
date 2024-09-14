import { useQuery } from '@tanstack/react-query';

import type { PendingGoalDTO } from '@dto/pending-goal';
import { getPendingGoals } from '@services/get-pending-goals';

export function useGetPendingGoals() {
  const ONE_MINUTE_IN_MILLISECONDS = 1000 * 60;

  const { data, isFetching, refetch } = useQuery<PendingGoalDTO[]>({
    queryKey: ['pending-goals'],
    staleTime: ONE_MINUTE_IN_MILLISECONDS,
    queryFn: async () => await getPendingGoals(),
  });

  return {
    pendingGoals: data,
    isFetchingPendingGoals: isFetching,
    refetchPendingGoals: refetch,
  };
}
