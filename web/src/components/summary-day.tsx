import dayjs from 'dayjs';
import { CheckCircle2 } from 'lucide-react';

import type { GoalDTO } from '@dto/goal';

interface SummaryDayProps {
  day: string;
  goals: GoalDTO[];
}

export function SummaryDay({ day, goals }: SummaryDayProps) {
  const dayOfWeek = dayjs(day).format('dddd');
  const dayOfMonth = dayjs(day).format('DD [de] MMMM');

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium">
        <span className="capitalize">{`${dayOfWeek}`}</span>

        <span className="text-zinc-400 text-xs">{` (${dayOfMonth})`}</span>
      </h3>

      <ul className="flex flex-col gap-3">
        {goals.map(goal => {
          const completedHour = dayjs(goal.completedAt).format('HH:mm[h]');

          return (
            <li key={goal.code} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />

              <span className="text-zinc-400 text-sm">
                Você completou "
                <span className="text-zinc-100">{goal.title}</span>" às{' '}
                <span className="text-zinc-100">{completedHour}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
