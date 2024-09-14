import dayjs from 'dayjs';
import { Plus } from 'lucide-react';

import { useGetSummary } from '@hooks/use-get-summary';

import { InOrbitIcon } from '@components/in-orbit-icon';
import { Loader } from '@components/loader';
import { PendingGoals } from '@components/pending-goals';
import { SummaryDay } from '@components/summary-day';
import { Button } from '@ui/button';
import { DialogTrigger } from '@ui/dialog';
import { Progress, ProgressIndicator } from '@ui/progress-bar';
import { Separator } from '@ui/separator';

export function Summary() {
  const { summary, isFetchingSummary } = useGetSummary();

  if (!summary) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM');
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM');

  const percentageOfCompletions = Math.round(
    (summary.completed * 100) / summary.total
  );

  function renderizarSumarioDaSemana() {
    if (!summary) return null;

    if (isFetchingSummary) {
      return <Loader />;
    }

    return (
      <>
        {summary.goalsPerDay ? (
          Object.entries(summary.goalsPerDay).map(([day, goals]) => (
            <SummaryDay key={day} day={day} goals={goals} />
          ))
        ) : (
          <div>
            <span className="text-zinc-400 text-sm">
              Você ainda não completou nenhuma meta essa semana.
            </span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="max-w-[480px] px-5 py-10 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />

          <span className="text-lg font-semibold capitalize">{`${firstDayOfWeek} - ${lastDayOfWeek}`}</span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={summary.completed} max={summary.total}>
          <ProgressIndicator style={{ width: `${percentageOfCompletions}%` }} />
        </Progress>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>
          Você completou{' '}
          <span className="text-zinc-100">{summary.completed}</span> de{' '}
          <span className="text-zinc-100">{summary.total}</span> metas nessa
          semana.
        </span>

        <span>{percentageOfCompletions}%</span>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {renderizarSumarioDaSemana()}
      </div>
    </div>
  );
}
