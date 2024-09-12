import { db } from '@/db';
import { goals } from '@/db/schema';
import { getGoalByTitle } from './get-goal-by-code';

interface CreateGoalRequest {
  title: string;
  desireWeeklyFrequency: number;
}

export async function createGoal({
  title,
  desireWeeklyFrequency,
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
    .values({ title, desireWeeklyFrequency })
    .returning();

  const goal = result[0];

  return { goal };
}
