import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

import { createGoal } from '@services/create-goal';

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desireWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async (request, reply) => {
      const { title, desireWeeklyFrequency } = request.body;

      const { goal } = await createGoal({
        title,
        desireWeeklyFrequency,
      });

      return reply.code(201).send(goal);
    }
  );
};
