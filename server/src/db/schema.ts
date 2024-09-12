import { createId } from '@paralleldrive/cuid2';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  code: text('code')
    .notNull()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  desireWeeklyFrequency: integer('desire_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const goalCompletions = pgTable('goal_completions', {
  id: serial('id').primaryKey(),
  code: text('code')
    .notNull()
    .$defaultFn(() => createId()),
  goalId: integer('goal_id')
    .references(() => goals.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
