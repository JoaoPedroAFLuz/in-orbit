import { useQuery } from '@tanstack/react-query';

import type { SummaryDTO } from '@dto/summary';
import { getSummary } from '@services/get-summary';

export function useGetSummary() {
  const ONE_MINUTE_IN_MILLISECONDS = 1000 * 60;

  const { data, isLoading, isFetching, refetch } = useQuery<SummaryDTO>({
    queryKey: ['summary'],
    staleTime: ONE_MINUTE_IN_MILLISECONDS,
    queryFn: async () => await getSummary(),
  });

  return {
    summary: data,
    isLoadingSummary: isLoading,
    isFetchingSummary: isFetching,
    refetchSummary: refetch,
  };
}
