import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { getWeekSummary } from '@/services/get-week-summary';

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary', async (_, reply) => {
    const { summary } = await getWeekSummary();

    return reply.send(summary);
  });
};
