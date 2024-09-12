import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

import { createGoalCompletion } from '@services/create-goal-completion';

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals/:goalCode/completions',
    {
      schema: {
        params: z.object({
          goalCode: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalCode } = request.params;

      await createGoalCompletion({ goalCode });

      return reply.send(201);
    }
  );
};
