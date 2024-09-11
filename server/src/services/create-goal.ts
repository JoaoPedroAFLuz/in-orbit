import { db } from '../db';
import { goals } from '../db/schema';

interface CreateGoalRequest {
  title: string;
  desireWeeklyFrequency: number;
}

interface CreateGoalResponse {
  goal: {
    title: string;
    desireWeeklyFrequency: number;
    code: string;
    id: number;
    createdAt: Date;
  };
}

export async function createGoal({
  title,
  desireWeeklyFrequency,
}: CreateGoalRequest): Promise<CreateGoalResponse> {
  const result = await db
    .insert(goals)
    .values({ title, desireWeeklyFrequency })
    .returning();

  const goal = result[0];

  return { goal };
}
