import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { goals } from '@/db/schema';

interface GetGoalByCodeRequest {
  title: string;
}

export async function getGoalByTitle({ title }: GetGoalByCodeRequest) {
  const result = await db
    .select()
    .from(goals)
    .where(eq(goals.title, title))
    .limit(1);

  const goal = result[0];

  return { goal };
}
