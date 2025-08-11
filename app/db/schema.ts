import { integer, sqliteTable, text, primaryKey, index, foreignKey, uniqueIndex, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').notNull().unique(),
    avatarUrl: text('avatar_url'),
    bio: text('bio'),
    passwordSalt: text('password_salt').notNull(),
    passwordHash: text('password_hash').notNull(),
    privilege: integer('privilege').notNull().default(0),
});

export const logs = sqliteTable('logs', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onUpdate: 'cascade', onDelete: 'restrict' }),
    eventType: text('event_type').notNull(),
    datetime: text('datetime').notNull(),
}, (table) => [
    index('logs_index_1').on(table.userId, table.eventType),
]);

export const habits = sqliteTable('habits', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onUpdate: 'cascade', onDelete: 'restrict' }),
    name: text('name').notNull(),
    description: text('description'),
    isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(false),
}, (table) => [
    index('habits_index_0').on(table.userId),
]);

export const habitsPunch = sqliteTable('habits_punch', {
    id: integer('id').primaryKey(),
    habitId: integer('habit_id').notNull().references(() => habits.id, { onUpdate: 'cascade', onDelete: 'restrict' }),
    datetime: text('datetime').notNull(),
}, (table) => [
    index('habits_punch_index_0').on(table.habitId),
]);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    logs: many(logs),
    habits: many(habits),
}));

export const logsRelations = relations(logs, ({ one }) => ({
    user: one(users, {
        fields: [logs.userId],
        references: [users.id],
    }),
}));

export const habitsRelations = relations(habits, ({ one, many }) => ({
    user: one(users, {
        fields: [habits.userId],
        references: [users.id],
    }),
    punches: many(habitsPunch),
}));

export const habitsPunchRelations = relations(habitsPunch, ({ one }) => ({
    habit: one(habits, {
        fields: [habitsPunch.habitId],
        references: [habits.id],
    }),
}));
