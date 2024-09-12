import fastify from 'fastify';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import z from 'zod';

import { env } from '../env';
import { createGoal } from '../services/create-goal';
import { createGoalCompletion } from '../services/create-goal-completion';
import { getWeekPendingGoals } from '../services/get-week-pending-goals';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pending-goals', async (_, reply) => {
  const { pendingGoals } = await getWeekPendingGoals();

  return reply.send(pendingGoals);
});

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

    return reply.code(201).send({ goal });
  }
);

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

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
