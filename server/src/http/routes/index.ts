import type { FastifyInstance } from 'fastify';

import { createCompletionRoute } from './create-completion';
import { createGoalRoute } from './create-goal';
import { getWeekPendingGoalsRoute } from './get-week-pending-goals';
import { getWeekSummaryRoute } from './get-week-summary';

export async function registerRoutes(app: FastifyInstance) {
  app.register(getWeekPendingGoalsRoute);
  app.register(getWeekSummaryRoute);
  app.register(createGoalRoute);
  app.register(createCompletionRoute);
}
