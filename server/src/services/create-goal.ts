import { db } from '@/db';
import { goals } from '@/db/schema';
import { getGoalByTitle } from './get-goal-by-code';

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const { goal: goalAlreadyExists } = await getGoalByTitle({
    title,
  });

  if (goalAlreadyExists) {
    throw new Error(
      `Já existe uma meta com este nome: '${goalAlreadyExists.title}'`
    );
  }

  const result = await db
    .insert(goals)
    .values({ title, desiredWeeklyFrequency })
    .returning();

  const goal = result[0];

  return { goal };
}
