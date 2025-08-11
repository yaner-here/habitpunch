import { eq } from 'drizzle-orm';
import type { DbClient } from '~/db/db';
import { habitsPunch } from '~/db/schema';

type NewHabitPunch = typeof habitsPunch.$inferInsert;

/**
 * 记录一次新的打卡
 * @param db - Drizzle 数据库实例
 * @param newPunch - 新的打卡记录
 */
export async function punchHabit(db: DbClient, newPunch: NewHabitPunch) {
    return await db.insert(habitsPunch).values(newPunch).returning();
}

/**
 * 获取某个习惯的所有打卡记录
 * @param db - Drizzle 数据库实例
 * @param habitId - 习惯的 ID
 */
export async function getHabitPunches(db: DbClient, habitId: number) {
    return await db.select().from(habitsPunch).where(eq(habitsPunch.habitId, habitId)).all();
}
