import type { GoalsPerDayDTO } from './goals-per-day';

export interface SummaryDTO {
  completed: number;
  total: number;
  goalsPerDay: GoalsPerDayDTO;
}
