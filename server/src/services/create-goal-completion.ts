import dayjs from 'dayjs';
import { and, count, eq, gte, lte, sql } from 'drizzle-orm';

import { db } from '../db';
import { goals, goalsCompletions } from '../db/schema';

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
        goalId: goalsCompletions.goalId,
        completionCount: count(goalsCompletions.id).as('completionCount'),
      })
      .from(goalsCompletions)
      .fullJoin(goals, eq(goalsCompletions.goalId, goals.id))
      .where(
        and(
          gte(goalsCompletions.createdAt, firstDayOfWeek),
          lte(goalsCompletions.createdAt, lastDayOfWeek),
          eq(goals.code, goalCode)
        )
      )
      .groupBy(goalsCompletions.goalId)
  );

  const result = await db
    .with(goalsCompletionCounts)
    .select({
      goalId: goals.id,
      desireWeeklyFrequency: goals.desireWeeklyFrequency,
      completionCount: sql /*sql*/`
        COALESCE(${goalsCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goals.id))
    .where(eq(goals.code, goalCode));

  const { goalId, desireWeeklyFrequency, completionCount } = result[0];

  if (completionCount >= desireWeeklyFrequency) {
    throw Error('Meta já foi alcançada nesta semana');
  }

  const insertResult = await db
    .insert(goalsCompletions)
    .values({ goalId })
    .returning();

  const goalCompletion = insertResult[0];

  return { goalCompletion };
}
