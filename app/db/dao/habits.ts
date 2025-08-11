import { eq } from 'drizzle-orm';
import type { DbClient } from '~/db/db';
import { habits } from '~/db/schema';

type NewHabit = typeof habits.$inferInsert;

/**
 * 创建一个新习惯
 * @param db - Drizzle 数据库实例
 * @param newHabit - 新习惯的数据
 */
export async function createHabit(db: DbClient, newHabit: NewHabit) {
    return await db.insert(habits).values(newHabit).returning();
}

/**
 * 根据 ID 获取单个习惯
 * @param db - Drizzle 数据库实例
 * @param id - 习惯 ID
 */
export async function getHabitById(db: DbClient, id: number) {
    return await db.select().from(habits).where(eq(habits.id, id)).get();
}

/**
 * 获取某个用户的所有习惯
 * @param db - Drizzle 数据库实例
 * @param userId - 用户 ID
 */
export async function getHabitsByUserId(db: DbClient, userId: number) {
    return await db.select().from(habits).where(eq(habits.userId, userId)).all();
}

/**
 * 更新一个习惯
 * @param db - Drizzle 数据库实例
 * @param id - 习惯 ID
 * @param updatedHabit - 需要更新的习惯数据
 */
export async function updateHabit(db: DbClient, id: number, updatedHabit: Partial<NewHabit>) {
    return await db.update(habits).set(updatedHabit).where(eq(habits.id, id)).returning();
}

/**
 * 删除一个习惯
 * @param db - Drizzle 数据库实例
 * @param id - 习惯 ID
 */
export async function deleteHabit(db: DbClient, id: number) {
    return await db.delete(habits).where(eq(habits.id, id)).returning();
}
