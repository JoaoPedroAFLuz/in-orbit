import type { GoalDTO } from './goal';

export interface GoalsPerDayDTO {
  goals: Record<string, GoalDTO>[];
}
