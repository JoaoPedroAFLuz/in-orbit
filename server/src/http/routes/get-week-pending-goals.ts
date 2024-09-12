import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { getWeekPendingGoals } from '@/services/get-week-pending-goals';

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async (_, reply) => {
    const { pendingGoals } = await getWeekPendingGoals();

    return reply.send(pendingGoals);
  });
};
