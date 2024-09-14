import dayjs from 'dayjs';
import { and, count, eq, gte, lte, sql } from 'drizzle-orm';

import { db } from '@/db';
import { goalCompletions, goals } from '@/db/schema';

interface CreateGoalCompletionRequest {
  goalCode: string;
}

export async function createGoalCompletion({
  goalCode,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate();
  const lastDayOfWeek = dayjs().endOf('week').toDate();

  const goalsCompletionCounts = db.$with('goals_completion_count').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .fullJoin(goals, eq(goalCompletions.goalId, goals.id))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goals.code, goalCode)
        )
      )
      .groupBy(goalCompletions.goalId)
  );

  const result = await db
    .with(goalsCompletionCounts)
    .select({
      goalId: goals.id,
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql /*sql*/`
        COALESCE(${goalsCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goals.id))
    .where(eq(goals.code, goalCode));

  const { goalId, desiredWeeklyFrequency, completionCount } = result[0];

  if (completionCount >= desiredWeeklyFrequency) {
    throw Error('Meta já foi alcançada nesta semana');
  }

  const insertResult = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning();

  const goalCompletion = insertResult[0];

  return { goalCompletion };
}
