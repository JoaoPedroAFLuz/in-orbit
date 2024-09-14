import { z } from 'zod';

export const createGoalSchema = z.object({
  title: z.string().min(1, 'O título da meta é obrigatório'),
  desiredWeeklyFrequency: z.coerce.number().int().min(1).max(7),
});

export type CreateGoalForm = z.infer<typeof createGoalSchema>;
